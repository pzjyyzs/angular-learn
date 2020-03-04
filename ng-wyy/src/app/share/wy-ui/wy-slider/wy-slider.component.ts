import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { filter, tap, pluck, map, distinctUntilChanged, takeUntil } from 'rxjs/internal/operators';
import { SliderEventObserverConfig } from './wy-slider-types';
import { DOCUMENT } from '@angular/common';
import { sliderEvent } from './wy-slider-helper';
import { fromEvent, merge, Observable } from 'rxjs';
import { inArray } from 'src/utils/array';
import { getElementOffset } from 'ng-zorro-antd';
import { limitNumberInRange } from 'src/utils/number';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderComponent implements OnInit {

  @Input() wyVertical = false;
  @Input() wyMin = 0;
  @Input() wyMax = 100;
  private sliderDom: HTMLDivElement;
  @ViewChild('wySlider', { static: true }) private wySlider: ElementRef;
  private dragStart$: Observable<number | void>;
  private dragMove$: Observable<number | void>;
  private dragEnd$: Observable<Event>;
  constructor(@Inject(DOCUMENT) private doc: Document) { }

  ngOnInit() {
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
    this.subscribeDrag(['start']);
  }

  private createDraggingObservables() {
    const orientField = this.wyVertical ? 'pageY' : 'pageX';
    const mouse: SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField]
    };
    const touch: SliderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: MouseEvent) => e instanceof TouchEvent,
      pluckKey: ['touches', '0', orientField]
    };

    [mouse, touch].forEach(source => {
      const { start, move, end, filter: filerFunc, pluckKey } = source;
      source.startPlucked$ = fromEvent(this.sliderDom, start)
        .pipe(
          filter(filerFunc),
          tap(sliderEvent),
          pluck(...pluckKey),
          map((position: number) => this.findClosestValue(position))
        );
      source.end$ = fromEvent(this.doc, end);
      source.moveResolved$ = fromEvent(this.doc, move).pipe(
        filter(filerFunc),
        tap(sliderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => {
          this.findClosestValue(position);
        }),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }

  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart$) {
      this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if (inArray(events, 'move') && this.dragMove$) {
      this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'start') && this.dragEnd$) {
      this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private onDragStart(value: number) {
    console.log(value)
  }
  private onDragMove(value: number) {

  }
  private onDragEnd() {

  }

  private findClosestValue(position: number): number {
    // 获取滑块总长
    const sliderLength = this.getSliderLength();
    // 滑块（左，上）端点位置
    const sliderStart = this.getSliderStartPosition();

    // 滑块当前位置 / 滑块总长
    const ratio = limitNumberInRange((position - sliderStart) / sliderLength,0,1);
    const ratioTrue = this.wyVertical ? 1 - ratio : ratio;
    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin;
  }

  private getSliderLength(): number {
    return this.wyVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }
  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.wyVertical ? offset.top : offset.left;
  }
}
