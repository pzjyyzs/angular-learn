import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyLayerDefaultComponent } from './wy-layer-default/wy-layer-default.component';
import { NzButtonModule, NzInputModule, NzCheckboxModule, NzSpinModule, NzAlertModule, NzListModule, NzIconModule, NzFormModule } from 'ng-zorro-antd';
import { WyLayerModalComponent } from './wy-layer-modal/wy-layer-modal.component';
import { WyLayerLoginComponent } from './wy-layer-login/wy-layer-login.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [WyLayerModalComponent, WyLayerDefaultComponent, WyLayerLoginComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    DragDropModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
    NzSpinModule,
    NzAlertModule,
    NzListModule,
    NzIconModule,
    NzFormModule,
    FormsModule
  ],
  exports: [WyLayerModalComponent, WyLayerDefaultComponent, WyLayerLoginComponent]
})
export class WyLayerModule { }
