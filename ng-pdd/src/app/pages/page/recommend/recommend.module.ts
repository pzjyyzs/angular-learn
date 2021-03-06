import { NgModule } from '@angular/core';
import { RecommendRoutingModule } from './recommend-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { RecommendComponent } from './component/recommend/recommend.component';



@NgModule({
  declarations: [RecommendComponent],
  imports: [
    ShareModule,
    RecommendRoutingModule
  ]
})
export class RecommendModule { }
