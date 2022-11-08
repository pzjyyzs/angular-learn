import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';



@NgModule({
  exports: [
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
  ]
})
export class NgZorroAntdModule { }
