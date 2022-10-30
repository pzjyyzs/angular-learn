import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ShareModule } from 'src/app/share/share.module';
import { HomeRoutingModule } from './home-routing.module';
import { RecommendComponent } from './recommend/recommend.component';
import { WyCarouselComponent } from './components/wy-carousel/wy-carousel.component';
import { WyCarouselContentDirective } from './components/wy-carousel/wy-carousel-content.directive';



@NgModule({
  declarations: [HomeComponent, RecommendComponent, WyCarouselComponent, WyCarouselContentDirective],
  imports: [
    ShareModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
