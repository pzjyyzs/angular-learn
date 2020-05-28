import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSlideComponent } from '../pdd-ui/image-slide/image-slide.component';



@NgModule({
  declarations: [ImageSlideComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ImageSlideComponent
  ]
})
export class ShareModule { }
