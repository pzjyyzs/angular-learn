import {  Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appWyCarouselContent]',
})
export class WyCarouselContentDirective {
  readonly el: HTMLElement;

  set isActive(value: boolean) {
    this._active = value;
    if (this.isActive) {
      this.renderer.addClass(this.el, 'slick-active');
    } else {
      this.renderer.removeClass(this.el, 'slick-active');
    }
  }

  get isActive(): boolean {
    return this._active;
  }

  private _active = false;
  constructor(elementRef: ElementRef, private renderer: Renderer2) {
    this.el = elementRef.nativeElement;
    this.renderer.addClass(elementRef.nativeElement, 'slick-slide');
  }

}
