import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ShareModule } from 'src/app/share/share.module';
import { HomeRoutingModule } from './home-routing.module';
import { RecommendComponent } from './recommend/recommend.component';
import { SheetInfoComponent } from './sheet-info/sheet-info.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent, RecommendComponent, SheetInfoComponent],
  imports: [
    ShareModule,
    HomeRoutingModule,
    ReactiveFormsModule,

  ]
})
export class HomeModule { }
