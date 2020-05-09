import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgDefault]'
})
export class ImgDefaultDirective {

  constructor() { }
  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    event.preventDefault();
  }
}
