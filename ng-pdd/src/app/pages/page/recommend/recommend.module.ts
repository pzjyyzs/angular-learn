import { NgModule } from '@angular/core';
import { RecommendRoutingModule } from './recommend-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';



@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    RecommendRoutingModule
  ]
})
export class RecommendModule { }
