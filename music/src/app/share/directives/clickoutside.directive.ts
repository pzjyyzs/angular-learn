import { DOCUMENT } from '@angular/common';
import { Directive, Input, OnChanges, Output, SimpleChanges, EventEmitter, Renderer2, ElementRef, Inject } from '@angular/core';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective implements OnChanges {

  private handleClick: () => void;
  @Input() bindFlag = false;
  @Output() onClickOutSide = new EventEmitter<HTMLElement>();
  constructor(private rd: Renderer2, private el: ElementRef, @Inject(DOCUMENT) private doc: Document) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bindFlag'] && !changes['bindFlag'].firstChange) {
      if (this.bindFlag) {
        this.handleClick = this.rd.listen(this.doc, 'click', evt => {
          const target = evt.target;
          const isContain = this.el.nativeElement.contains(target);
          if (!isContain) {
            this.onClickOutSide.emit(target);
          }
        })
      } else {
        this.handleClick();
      }
    }
  }
}
