import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stock-counter',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StockCounterComponent),
    multi: true
  }],
  template: `
    <div class="stock-counter" [class.focused]="focus">
      <div>
        <div (keydown)="onKeyDown($event)" (blur)="onBlur($event)" (focus)="onFocus($event)">
          <p> {{ value }} </p>
          <div>
            <button type="button" (click)="increment()" [disabled]="value === max">+</button>
            <button type="button" (click)="decrement()" [disabled]="value === min">-</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./stock-counter.component.less']
})
export class StockCounterComponent implements OnInit, ControlValueAccessor {

  @Input() step: number = 0;
  @Input() min: number = 10;
  @Input() max: number = 1000;

  focus: boolean = false;
  private onTouch!: Function;
  private onModelChange!: Function;
  value: number = 10;
  constructor() { }

  writeValue(value: any): void {
    this.value = value || 0;
  }
  registerOnChange(fn: any): void {
    this.onTouch = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onKeyDown(event: KeyboardEvent) {
    const handlers: { [key: string]: () => void } = {
      'ArrowDown': () => this.decrement(),
      'ArrowUp': () => this.increment()
    };

    if (handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
    this.onTouch();
  }

  onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }
  ngOnInit(): void {
  }

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
}
