import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { AuthFormComponent } from './auth-form/auth-form.component';



@NgModule({
  declarations: [ContentComponent, AuthFormComponent],
  imports: [
    CommonModule
  ]
})
export class ContentModule { }
