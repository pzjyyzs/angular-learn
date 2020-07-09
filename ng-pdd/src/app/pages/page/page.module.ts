import { NgModule } from '@angular/core';
import { HomeModule } from 'src/app/home/home.module';



@NgModule({
  imports: [
    HomeModule
  ],
  declarations: [],
  exports: [
    HomeModule
  ]
})
export class PageModule { }
