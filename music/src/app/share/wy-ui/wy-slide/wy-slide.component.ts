import { takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { distinctUntilChanged, filter, map, tap, Observable, fromEvent, Subscription } from 'rxjs';
import { SlideDirection, SliderEventObserverConfig, SlideValue } from './wy-slide.type';
import { DOCUMENT } from '@angular/common';
import { getElementOffset, sliderEvent } from './wy-slide-help';
import { getPercent, limitNumberInRange } from 'src/app/utils/number';
import { inArray } from 'src/app/utils/array';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-wy-slide',
  templateUrl: './wy-slide.component.html',
  styleUrls: ['./wy-slide.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WySlideComponent),
    multi: true
  }]
})
export class WySlideComponent implements OnInit, ControlValueAccessor {

  @Input() bufferOffset: SlideValue = 0;
  @Input() progressBar: number = 0;
  @Input() wyMin = 0;
  @Input() wyMax = 100;
  @Input() direction: SlideDirection = 'horizontal';
  @Input() needProgressBar: boolean = false;
  @Output() wyOnAfterChange = new EventEmitter<SlideValue>();

  @ViewChild('wySlider', { static: true }) private wySlider: ElementRef;

  value: SlideValue = null;
  offset: SlideValue = null;

  private sliderDom: HTMLDivElement;
  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;
  private dragStart_: Subscription | null;
  private dragMove_: Subscription | null;
  private dragEnd_: Subscription | null;
  private isDragging = false;
  private onValueChange(value: SlideValue): void {}
  private onTouched(): void {}
  constructor(@Inject(DOCUMENT) private doc: Document, private cdr: ChangeDetectorRef) { }

  writeValue(value: SlideValue): void {
    this.setValue(value, true);
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  registerOnChange(fn: (value: SlideValue) => void): void {
    this.onValueChange = fn;
  }

  ngOnInit(): void {
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
    this.subscribeDrag(['start']);
  }

  private createDraggingObservables() {
    const orientField = this.direction === "vertical" ? 'pageY' : 'pageX';
    const mouseHandle: SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField]
    };

    this.dragStart$ = fromEvent<MouseEvent>(this.sliderDom, 'mousedown')
      .pipe(
        filter(mouseHandle.filter),
        tap(sliderEvent),
        map((item) => item.pageX),
        distinctUntilChanged(),
        map((position: number) => {
          return this.findClosestValue(position);
        })
      )

      this.dragEnd$ = fromEvent(this.doc, 'mouseup');
      this.dragMove$ = fromEvent<MouseEvent>(this.doc, "mousemove").pipe(
        filter(mouseHandle.filter),
        tap(sliderEvent),
        map((item) => item.pageX),
        distinctUntilChanged(),
        map((position: number) => {
          return this.findClosestValue(position);
        }),
        takeUntil(this.dragEnd$)
      )

  }

  private onDragStart(value: number) {
    this.toggleDragMoving(true);
    this.setValue(value);
  }

  private onDragMove(value: number) {
    if (this.isDragging) {
      this.setValue(value);
      this.cdr.markForCheck();
    }
  }
  private onDragEnd() {
    this.wyOnAfterChange.emit(this.value);
    this.toggleDragMoving(false);
    this.cdr.markForCheck();
  }

  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart$ && !this.dragStart_) {
      this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this))
    }
    if (inArray(events, 'move') && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'end') && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private toggleDragMoving(movable: boolean) {
    this.isDragging = movable;
    if (movable) {
      this.subscribeDrag(['move', 'end']);
    } else {
      this.unsubscribeDrag(['move', 'end']);
    }
  }

  private unsubscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }
    if (inArray(events, 'move') && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }
    if (inArray(events, 'end') && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  private setValue(value: SlideValue, needCheck = false) {
    if (needCheck) {
      if (this.isDragging) { return; }
      this.value = this.formatValue(value)
      this.updateTrackAndHandles();
    } else if (!this.valuesEqual(this.value, value)){
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.value);
    }
  }

  private formatValue(value: SlideValue): SlideValue {
    let res = value;
    if(value){
      res = this.assertValueValid(value) ? this.wyMin : limitNumberInRange(value, this.wyMin, this.wyMax);
    }
    return res;
  }

  private assertValueValid(value: SlideValue): boolean {
    if(value) {
      return isNaN(typeof value !== 'number' ? parseFloat(value): value);
    }
    return false;
  }

  private findClosestValue(position: number): number {
    // 获取滑块总长
    const sliderLength = this.getSliderLength();

    // 滑块(左, 上)端点位置
    const sliderStart = this.getSliderStartPosition();

    // 滑块当前位置 / 滑块总长
    const ratio = limitNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const ratioTrue = this.direction === "vertical" ? 1 - ratio : ratio;
    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin;
  }

  private getSliderLength(): number {
    return this.direction === "vertical" ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }

  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.direction === "vertical" ? offset.top : offset.left;
  }

  private updateTrackAndHandles() {
    let offset = this.getValueToOffset(this.value);
    if (this.needProgressBar) {
      if (offset && this.progressBar > offset) {
        this.bufferOffset = offset;
      }
    } else {
      if (offset) {
        this.bufferOffset = offset;
      }
    }
    this.cdr.markForCheck();
  }

  private valuesEqual(valA: SlideValue, valB: SlideValue): boolean {
    if (typeof valA !== typeof valB) {
      return false;
    }
    return valA === valB;
  }
  private getValueToOffset(value: SlideValue): SlideValue {
    return getPercent(this.wyMin, this.wyMax, value || 0);
  }
}
