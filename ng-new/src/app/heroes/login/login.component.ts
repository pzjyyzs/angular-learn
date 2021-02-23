import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthKey } from 'src/app/configs/contsant';
import { AccountService } from 'src/app/services/account.service';
import { LoginArg } from '../home/add-hero/types';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  formValues: LoginArg = {
    name: '',
    password: ''
  };
  constructor(private router: Router, private accountServe: AccountService, private userServe: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('form', form.value);
    if (form.valid) {
      this.accountServe.login(form.value)
      .subscribe(({user, token}) => {
        localStorage.setItem(AuthKey, token);
        this.userServe.setUser(user);
        alert('登陆成功');
        const to = this.accountServe.redirectTo || '/home/heroes';
        this.router.navigateByUrl(to).then(() => {
          this.accountServe.redirectTo = '';
        });
      });
    }
  }
}
