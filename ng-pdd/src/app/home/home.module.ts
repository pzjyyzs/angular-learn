import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from '../share/share/share.module';
import { HomeContainerComponent } from './component/home-container/home-container.component';


@NgModule({
  declarations: [HomeContainerComponent],
  imports: [
    ShareModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
