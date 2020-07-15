import { NgModule } from '@angular/core';
import { MyRoutingModule } from './my-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';


@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    MyRoutingModule
  ]
})
export class MyModule { }
