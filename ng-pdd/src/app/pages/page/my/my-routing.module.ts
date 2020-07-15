import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyComponent } from './component/my/my.component';


const routes: Routes = [
  { path: 'my', component: MyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRoutingModule { }
