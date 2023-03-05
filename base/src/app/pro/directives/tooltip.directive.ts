import { Directive, Input, OnInit, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  exportAs: 'tooltip',
})
export class TooltipDirective implements OnInit {

  tooltipElement = document.createElement('div');
  visible = false;

  @Input()
  set appTooltip(value: string | null) {
    console.log(123, value)
    this.tooltipElement.textContent = value;
  }
  constructor(
    private element: ElementRef,
    private view: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.tooltipElement.className = 'tooltip';
    this.element.nativeElement.appendChild(this.tooltipElement);
    this.element.nativeElement.classList.add('tooltip-container');
  }

  hide() {
    this.tooltipElement.classList.remove('tooltip--active');
  }

  show() {
    this.tooltipElement.classList.add('tooltip--active');
  }
}
