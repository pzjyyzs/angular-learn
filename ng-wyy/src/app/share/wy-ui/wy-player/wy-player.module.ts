import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyPlayerComponent } from './wy-player.component';
import { WySliderModule } from '../wy-slider/wy-slider.module';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { WiPlayerPanelComponent } from './wi-player-panel/wi-player-panel.component';
import { WyScrollComponent } from './wy-scroll/wy-scroll.component';
import { ClickoutsideDirective } from '../../directives/clickoutside.directive';



@NgModule({
  declarations: [
    WyPlayerComponent,
    FormatTimePipe,
    WiPlayerPanelComponent,
    WyScrollComponent,
    ClickoutsideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    WySliderModule
  ],
  exports: [WyPlayerComponent, FormatTimePipe, ClickoutsideDirective]
})
export class WyPlayerModule { }
