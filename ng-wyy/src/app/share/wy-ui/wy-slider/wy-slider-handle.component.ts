import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WySliderStyle } from './wy-slider-types';

@Component({
  selector: 'app-wy-slider-handle',
  template: `<div class="wy-slider-handle" [ngStyle]="style"></div>`
})
export class WySliderHandleComponent implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyOffset: number;
  style:WySliderStyle = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wyOffset']) {
      this.style[this.wyVertical ? 'bottom' : 'left'] = this.wyOffset + '%';
    }
  }
}
