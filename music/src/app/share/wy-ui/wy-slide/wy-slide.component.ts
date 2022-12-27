import { pluck, takeUntil } from 'rxjs/operators';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, filter, from, fromEvent, map, tap } from 'rxjs';
import { SlideDirection, SliderEventObserverConfig, SlideValue } from './wy-slide.type';
import { DOCUMENT } from '@angular/common';
import { getElementOffset, sliderEvent } from './wy-slide-help';
import { limitNumberInRange } from 'src/app/utils/number';

@Component({
  selector: 'app-wy-slide',
  templateUrl: './wy-slide.component.html',
  styleUrls: ['./wy-slide.component.less']
})
export class WySlideComponent implements OnInit {


  @Input() bufferOffset: SlideValue = 0;
  @Input() progressBar: string = '0%';
  @Input() wyMin = 0;
  @Input() wyMax = 100;
  @Input() direction: SlideDirection = 'horizontal';

  @ViewChild('wySlider', { static: true }) private wySlider: ElementRef;
  private sliderDom: HTMLDivElement;
  constructor(@Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
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

    mouseHandle.startPlucked$ = fromEvent<MouseEvent>(this.sliderDom, 'mousedown')
      .pipe(
        filter(mouseHandle.filter),
        tap(sliderEvent),
        map((item) => item.pageX),
        map((position: number) => {
          return this.findClosestValue(position);
        })
      )

      mouseHandle.startPlucked$.subscribe(() => {

      })
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
    console.log('123', offset)
    return this.direction === "vertical" ? offset.top : offset.left;
  }
}
