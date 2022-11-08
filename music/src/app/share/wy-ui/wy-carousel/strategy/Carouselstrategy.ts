import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { NzCarouselComponentAsSource } from '../types';
import { WyCarouselContentDirective } from '../wy-carousel-content.directive';
import { Observable, Subject } from 'rxjs';
import { Platform } from '@angular/cdk/platform';

export class CarouselStrategy< T = any > {
  protected carouselComponent: NzCarouselComponentAsSource | null;
  protected contents!: WyCarouselContentDirective[];
  protected slickListEl!: HTMLElement;
  protected slickTrackEl!: HTMLElement;
  protected length!: number;
  protected unitWidth!: number;
  protected unitHeight!: number;

  protected get maxIndex(): number {
    return this.length - 1;
  }

  constructor(
    carouselComponent: NzCarouselComponentAsSource,
    protected cdr: ChangeDetectorRef,
    protected renderer: Renderer2,
    protected platform: Platform,
    protected options?: T
  ){
    this.carouselComponent = carouselComponent;
  }

  withCarouselContents(contents: QueryList<WyCarouselContentDirective> | null): void {
    const carousel = this.carouselComponent;
    this.slickListEl = carousel!.slickListEl;
    this.slickTrackEl = carousel!.slickTrackEl;
    this.contents = contents?.toArray() || [];
    this.length = this.contents.length;
    const rect = carousel!.el.getBoundingClientRect();
    this.unitWidth = rect.width;
    this.unitHeight = rect.height;

    if (this.contents) {
      this.slickTrackEl.style.width = `${this.length * this.unitWidth}px`;

      this.contents.forEach((content: WyCarouselContentDirective, i: number) => {
        this.renderer.setStyle(content.el, 'opacity', this.carouselComponent!.activeIndex === i ? '1' : '0');
        this.renderer.setStyle(content.el, 'position', 'relative');
        this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
        this.renderer.setStyle(content.el, 'left', `${-this.unitWidth * i}px`);
        this.renderer.setStyle(content.el, 'transition', ['opacity 500ms ease 0s', 'visibility 500ms ease 0s']);
      });
    }
  }

  switch(_f: number, _t: number): Observable<void> {
    const { to: t } = this.getFromToInBoundary(_f, _t);
    const complete$ = new Subject<void>();

    this.contents.forEach((content: WyCarouselContentDirective, i: number) => {
      this.renderer.setStyle(content.el, 'opacity', t === i ? '1' : '0');
    });

    setTimeout(() => {
      complete$.next();
      complete$.complete();
    }, 10);

    return complete$;
  }

  protected getFromToInBoundary(f: number, t: number): any {
    const length = this.maxIndex + 1;
    return { from: (f + length) % length, to: (t + length) % length };
  }

  dispose(): void {
    this.renderer.setStyle(this.slickTrackEl, 'transform', null);
  }
}
