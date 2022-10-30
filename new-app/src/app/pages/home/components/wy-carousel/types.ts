import { NgZone, QueryList } from '@angular/core';
import { WyCarouselContentDirective } from './wy-carousel-content.directive';

export interface NzCarouselComponentAsSource {
  carouselContents: QueryList<WyCarouselContentDirective>;
  el: HTMLElement;
  slickListEl: HTMLElement;
  slickTrackEl: HTMLElement;
  activeIndex: number;
  ngZone: NgZone;
}
