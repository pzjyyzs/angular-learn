import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { ImageSlideComponent } from '../pdd-ui/image-slide/image-slide.component';
import { HorizontalGridComponent } from '../pdd-ui/horizontal-grid/horizontal-grid.component';
import { ScrollableTabComponent } from '../pdd-ui/scrollable-tab/scrollable-tab.component';



@NgModule({
  declarations: [ImageSlideComponent, HorizontalGridComponent, ScrollableTabComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ImageSlideComponent,
    HorizontalGridComponent,
    ScrollableTabComponent
  ]
})
export class ShareModule { }
