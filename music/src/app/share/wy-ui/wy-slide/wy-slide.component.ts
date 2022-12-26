import { takeUntil } from 'rxjs/operators';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, filter, from, fromEvent, map, pluck, tap } from 'rxjs';
import { SlideDirection, sliderEvent, SliderEventObserverConfig, SlideValue } from './wy-slide.type';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-wy-slide',
  templateUrl: './wy-slide.component.html',
  styleUrls: ['./wy-slide.component.less']
})
export class WySlideComponent implements OnInit {


  @Input() bufferOffset: SlideValue = 0;
  @Input() progressBar: string = '0%';
  @Input() direction: SlideDirection = 'horizontal';

  @ViewChild('wySlider', { static: true }) private wySlider: ElementRef;
  private sliderDom: HTMLDivElement;
  constructor(@Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
    this.sliderDom = this.wySlider.nativeElement;
    this.createDraggingObservables();
  }

  private createDraggingObservables() {

  }
}
