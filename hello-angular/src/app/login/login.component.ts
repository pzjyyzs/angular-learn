import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  constructor(private service: AuthService) { }

  ngOnInit() {
  }
  
  onClick() {
    console.log('auth result is: '+ this.service.loginWithCredentials(this.username, this.password));
  }

  onSubmit(formValue) {
    console.log(formValue);
  }
}
