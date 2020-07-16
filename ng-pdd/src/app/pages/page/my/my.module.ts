import { NgModule } from '@angular/core';
import { MyRoutingModule } from './my-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { MyComponent } from './component/my/my.component';


@NgModule({
  declarations: [MyComponent],
  imports: [
    ShareModule,
    MyRoutingModule
  ]
})
export class MyModule { }
