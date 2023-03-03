import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthRememberComponent } from './auth-form/auth-remember/auth-remember.component';
import { AuthMessageComponent } from './auth-form/auth-message/auth-message.component';



@NgModule({
  declarations: [ContentComponent, AuthFormComponent, AuthRememberComponent, AuthMessageComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ContentModule { }
