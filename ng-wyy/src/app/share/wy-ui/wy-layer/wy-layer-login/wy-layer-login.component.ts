import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


export type LoginParams = {
  phone: string;
  password: string;
  remember: boolean;
}
@Component({
  selector: 'app-wy-layer-login',
  templateUrl: './wy-layer-login.component.html',
  styleUrls: ['./wy-layer-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerLoginComponent implements OnInit, OnChanges {
  @Input() wyRememberLogin: LoginParams;
  @Output() onChangeModalType = new EventEmitter<string | void>();
  @Output() onLogin = new EventEmitter<LoginParams>();
  formModel: FormGroup;
  constructor(private fb: FormBuilder) {

   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userLoginParams = changes.wyRememberLogin;
    const visible = changes.visible;
    if (userLoginParams) {
      let phone = '';
      let password = '';
      let remember = false;
      if (userLoginParams.currentValue) {
        const value = codeJson(userLoginParams.currentValue, 'decode');
        phone = value.phone;
        password = value.password;
        remember = value.remember;
      }
      this.setModel({ phone, password, remember });
    }


    if (visible && !visible.firstChange) {
      this.formModel.markAllAsTouched();
    }
  }

  onSubmit() {
    const model = this.formModel;
    if (model.valid) {
      this.onLogin.emit(model.value);
    }
  }

  private setModel({ phone, password, remeber}) {
    this.formModel = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }
}
