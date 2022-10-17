import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';



@NgModule({
  exports: [
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule
  ]
})
export class NgZorroAntdModule { }
