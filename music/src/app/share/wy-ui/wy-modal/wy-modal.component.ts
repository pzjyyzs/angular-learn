import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-wy-modal',
  templateUrl: './wy-modal.component.html',
  styleUrls: ['./wy-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyModalComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() closeModal = new EventEmitter;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  close() {
    this.closeModal.emit();
    this.cdr.markForCheck();
  }
}
