import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendComponent } from './component/recommend/recommend.component';


const routes: Routes = [
  {path: 'recommend', component: RecommendComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendRoutingModule { }
