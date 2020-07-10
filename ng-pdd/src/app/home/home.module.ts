import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from '../share/share/share.module';
import { HomeContainerComponent } from './component/home-container/home-container.component';
import { HomeDetailComponent } from './component/home-detail/home-detail.component';


@NgModule({
  declarations: [HomeContainerComponent, HomeDetailComponent],
  imports: [
    ShareModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
