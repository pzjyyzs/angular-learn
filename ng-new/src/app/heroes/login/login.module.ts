import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { OpenCloseComponent } from './open-close/open-close.component';
import { FlyInOutComponent } from './fly-in-out/fly-in-out.component';
import { InsertRemoveComponent } from './insert-remove/insert-remove.component';


@NgModule({
  declarations: [LoginComponent, OpenCloseComponent, FlyInOutComponent, InsertRemoveComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
