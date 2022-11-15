import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RecommendComponent } from './recommend/recommend.component';
import { SheetInfoComponent } from './sheet-info/sheet-info.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'recommend', component: RecommendComponent },
      { path: 'sheetinfo/:id', component: SheetInfoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
