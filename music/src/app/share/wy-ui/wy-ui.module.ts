import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingSheetComponent } from './sing-sheet/sing-sheet.component';
import { WyCarouselComponent } from './wy-carousel/wy-carousel.component';
import { WyCarouselContentDirective } from './wy-carousel/wy-carousel-content.directive';
import { PlayCountPipe } from '../pipes/play-count.pipe';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd/ng-zorro-antd.module';
import { PlayerComponent } from './player/player.component';
import { FormatTimePipe } from '../pipes/format-time.pipe';
import { WySlideComponent } from './wy-slide/wy-slide.component';
import { FormsModule } from '@angular/forms';
import { WyPlayerPanelComponent } from './wy-player-panel/wy-player-panel.component';
import { ClickoutsideDirective } from '../directives/clickoutside.directive';
import { WyModalComponent } from './wy-modal/wy-modal.component';



@NgModule({
  declarations: [
    SingSheetComponent,
    WyCarouselComponent,
    WyCarouselContentDirective,
    PlayCountPipe,
    PlayerComponent,
    FormatTimePipe,
    WySlideComponent,
    WyPlayerPanelComponent,
    ClickoutsideDirective,
    WyModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
  ],
  exports: [
    SingSheetComponent,
    WyCarouselComponent,
    WyCarouselContentDirective,
    PlayCountPipe,
    PlayerComponent,
    FormatTimePipe,
    WySlideComponent,
    WyPlayerPanelComponent,
    ClickoutsideDirective,
    WyModalComponent
  ]
})
export class WyUiModule { }
