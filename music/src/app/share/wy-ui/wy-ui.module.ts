import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingSheetComponent } from './sing-sheet/sing-sheet.component';
import { WyCarouselComponent } from './wy-carousel/wy-carousel.component';
import { WyCarouselContentDirective } from './wy-carousel/wy-carousel-content.directive';
import { PlayCountPipe } from '../pipes/play-count.pipe';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd/ng-zorro-antd.module';



@NgModule({
  declarations: [
    SingSheetComponent,
    WyCarouselComponent,
    WyCarouselContentDirective,
    PlayCountPipe
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  exports: [
    SingSheetComponent,
    WyCarouselComponent,
    WyCarouselContentDirective,
    PlayCountPipe
  ]
})
export class WyUiModule { }
