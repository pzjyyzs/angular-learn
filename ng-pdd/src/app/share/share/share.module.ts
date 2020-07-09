import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageSlideComponent } from '../pdd-ui/image-slide/image-slide.component';
import { HorizontalGridComponent } from '../pdd-ui/horizontal-grid/horizontal-grid.component';
import { ScrollableTabComponent } from '../pdd-ui/scrollable-tab/scrollable-tab.component';
import { FooterComponent } from '../pdd-ui/footer/footer.component';
import { GridItemDirective } from '../directives/grid-item.directive';
import { GridItemTitleDirective } from '../directives/grid-item-title.directive';
import { GridItemImageDirective } from '../directives/grid-item-image.directive';



@NgModule({
  declarations: [
    ImageSlideComponent,
    HorizontalGridComponent,
    ScrollableTabComponent,
    FooterComponent,
    GridItemDirective,
    GridItemTitleDirective,
    GridItemImageDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ImageSlideComponent,
    HorizontalGridComponent,
    ScrollableTabComponent,
    FooterComponent,
    GridItemDirective,
    GridItemTitleDirective,
    GridItemImageDirective
  ]
})
export class ShareModule { }
