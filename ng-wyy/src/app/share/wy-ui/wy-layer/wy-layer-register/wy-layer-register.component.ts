import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/service/member.service';
import { NzMessageService } from 'ng-zorro-antd';
import { interval } from 'rxjs';
import { take } from 'rxjs/internal/operators';
import { ModalTypes } from 'src/app/reducers/member.reducer';

enum Exist {
  '存在' = 1,
  '不存在' = -1
}

@Component({
  selector: 'app-wy-layer-register',
  templateUrl: './wy-layer-register.component.html',
  styleUrls: ['./wy-layer-register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerRegisterComponent implements OnInit, OnChanges {

  @Input() visible = false;
  @Output() onChangeModalType = new EventEmitter<string | void>();
  formModel: FormGroup;
  timing: number;
  showCode = false;
  codePass: string | boolean = '';
  @Output() onRegister = new EventEmitter<string>();
  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private messageServe: NzMessageService,
    private cdr: ChangeDetectorRef) {
    this.formModel = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visible && !changes.visible.isFirstChange) {
      this.formModel.markAllAsTouched();
      if (!this.visible) {
        this.showCode = false;
      }
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.formModel.valid) {
      this.sendCode();
    }
  }

  sendCode() {
    this.memberService.sendCode(this.formModel.get('phone').value).subscribe(() => {
      this.timing = 60;
      if (!this.showCode) {
        this.showCode = true;
      }
      this.cdr.markForCheck();
      interval(1000).pipe(take(60)).subscribe(() => {
        this.timing--;
        this.cdr.markForCheck();
      });
    }, error => {
      this.messageServe.error(error.message);
    });
  }

  onCheckCode(code: string) {
    this.memberService.checkCode(this.formModel.get('phone').value, Number(code))
      .subscribe(
        () => this.codePass = true,
        () => this.codePass = false,
        () => this.cdr.markForCheck()
      );
  }

  onCheckExist() {
    const phone = this.formModel.get('phone').value;
    this.memberService.checkExist(Number(phone)).subscribe(res => {
      if (Exist[res] === '存在') {
        this.messageServe.error('账号已存在');
        this.changeType(ModalTypes.LoginByPhone);
      } else {
        this.onRegister.emit(phone);
      }
    });
  }

  changeType(type = ModalTypes.Default) {
    this.showCode = false;
    this.formModel.reset();
    this.onChangeModalType.emit(type);
  }
}
