import { NgModule } from '@angular/core';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { PlayCountPipe } from '../pipes/play-count.pipe';
import { WyPlayerModule } from './wy-player/wy-player.module';
import { WySearchModule } from './wy-search/wy-search.module';
import { WyLayerModule } from './wy-layer/wy-layer.module';
import { WyLayerModalComponent } from './wy-layer/wy-layer-modal/wy-layer-modal.component';



@NgModule({
  declarations: [SingleSheetComponent, PlayCountPipe, WyLayerModalComponent],
  imports: [
    WyPlayerModule,
    WySearchModule,
    WyLayerModule
  ],
  exports: [SingleSheetComponent, PlayCountPipe, WyPlayerModule, WySearchModule, WyLayerModule]
})
export class WyUiModule { }
