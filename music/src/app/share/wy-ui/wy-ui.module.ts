import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingSheetComponent } from './sing-sheet/sing-sheet.component';
import { WyCarouselComponent } from './wy-carousel/wy-carousel.component';
import { WyCarouselContentDirective } from './wy-carousel/wy-carousel-content.directive';
import { PlayCountPipe } from '../pipes/play-count.pipe';



@NgModule({
  declarations: [
    SingSheetComponent,
    WyCarouselComponent,
    WyCarouselContentDirective,
    PlayCountPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SingSheetComponent,
    WyCarouselComponent,
    WyCarouselContentDirective,
    PlayCountPipe
  ]
})
export class WyUiModule { }
