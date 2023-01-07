import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-wy-modal',
  templateUrl: './wy-modal.component.html',
  styleUrls: ['./wy-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WyModalComponent),
    multi: true
  }]
})
export class WyModalComponent implements OnInit, ControlValueAccessor {

  show: boolean = false;

  private onValueChange(value: boolean): void {}
  private onTouched(): void {}
  constructor(private cdr: ChangeDetectorRef) { }
  writeValue(val: boolean): void {
   this.show = val;
  }
  registerOnChange(fn: () => void): void {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  ngOnInit(): void {
  }

  close() {
    this.show = false;
    this.onValueChange(this.show);
    this.cdr.markForCheck();
  }
}
