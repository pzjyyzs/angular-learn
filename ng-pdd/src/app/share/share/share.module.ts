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
import { CountDownComponent } from '../pdd-ui/count-down/count-down.component';
import { VerticalGridComponent } from '../pdd-ui/vertical-grid/vertical-grid.component';
import { ProductCardComponent } from '../pdd-ui/product-card/product-card.component';
import { TagDirective } from '../directives/tab.directive';
import { AvatarDirective } from '../directives/avatar.directive';
import { ProductTileComponent } from '../pdd-ui/product-tile/product-tile.component';



@NgModule({
  declarations: [
    ImageSlideComponent,
    HorizontalGridComponent,
    ScrollableTabComponent,
    FooterComponent,
    CountDownComponent,
    VerticalGridComponent,
    ProductCardComponent,
    ProductTileComponent,
    GridItemDirective,
    GridItemTitleDirective,
    GridItemImageDirective,
    TagDirective,
    AvatarDirective
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
    CountDownComponent,
    ProductCardComponent,
    VerticalGridComponent,
    ProductTileComponent,
    GridItemDirective,
    GridItemTitleDirective,
    GridItemImageDirective,
    TagDirective,
    AvatarDirective
  ]
})
export class ShareModule { }
