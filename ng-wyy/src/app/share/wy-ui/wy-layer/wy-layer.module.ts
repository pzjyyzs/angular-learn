import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyLayerDefaultComponent } from './wy-layer-default/wy-layer-default.component';
import { NzButtonModule } from 'ng-zorro-antd';
import { WyLayerModalComponent } from './wy-layer-modal/wy-layer-modal.component';
import { WyLayerLoginComponent } from './wy-layer-login/wy-layer-login.component';



@NgModule({
  declarations: [WyLayerModalComponent, WyLayerDefaultComponent, WyLayerLoginComponent],
  imports: [
    CommonModule,
    NzButtonModule
  ],
  exports: [WyLayerModalComponent, WyLayerDefaultComponent, WyLayerLoginComponent]
})
export class WyLayerModule { }
