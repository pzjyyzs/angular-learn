import { User } from './auth-form/auth-form.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnInit {

  rememberMe: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  createUser(user: User) {

  }

  loginUser(user: User) {

  }

  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }
}
