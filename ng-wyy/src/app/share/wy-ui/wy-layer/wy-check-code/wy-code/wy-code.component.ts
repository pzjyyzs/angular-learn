import { Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { BACKSPACE } from '@angular/cdk/keycodes';

const CODELEN = 4;
@Component({
  selector: 'app-wy-code',
  templateUrl: './wy-code.component.html',
  styleUrls: ['./wy-code.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WyCodeComponent),
      multi: true
    }
  ]
})
export class WyCodeComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {

  inputArr = [];
  private code: string;
  inputEl: HTMLElement[];
  private destory$ = new Subject();
  result: string[] = [];
  currentFocusIndex = 0;
  @ViewChild('codeWrap', { static: true }) private codeWrap: ElementRef;
  constructor(private cdr: ChangeDetectorRef) {
    this.inputArr = Array(CODELEN).fill('');
  }

  ngAfterViewInit(): void {
    this.inputEl = this.codeWrap.nativeElement.getElementsByClassName('item') as HTMLElement[];
    this.inputEl[0].focus();
    for (let a = 0; a < this.inputEl.length; a++) {
      const item = this.inputEl[a];
      fromEvent(item, 'keyup').pipe(takeUntil(this.destory$)).subscribe((event: KeyboardEvent) => this.listenKeyUp(event));
      fromEvent(item, 'click').pipe(takeUntil(this.destory$)).subscribe(() => this.currentFocusIndex = a);
    }
  }

  private listenKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const isBackSpack = event.keyCode === BACKSPACE;
    if (/\D/.test(value)) {
      target.value = '';
      this.result[this.currentFocusIndex] = '';
    } else if (value) {
      this.result[this.currentFocusIndex] = value;
      this.currentFocusIndex = (this.currentFocusIndex + 1) % CODELEN;
      this.inputEl[this.currentFocusIndex].focus();
    } else if (isBackSpack) {
      this.result[this.currentFocusIndex] = '';
      this.currentFocusIndex = Math.max(this.currentFocusIndex - 1, 0);
      this.inputEl[this.currentFocusIndex].focus();
    }

    this.checkResult(this.result);
  }

  private checkResult(result: string[]) {
    const codeStr = result.join('');
    this.setValue(codeStr);
  }
  private setValue(code: string) {
    this.code = code;
    this.onValueChange(code);
    this.cdr.markForCheck();
  }
  private onValueChange(value: string): void { }
  private onTouch(): void { }
  writeValue(value: string): void {
    this.setValue(value);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
