import { BaseComponent } from './base.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin/admin.module';
import { DonutListComponent } from '../admin/containers/donut-list/donut-list.component';
import { DonutSingleComponent } from '../admin/containers/donut-single/donut-single.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'index',
    component: BaseComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(x => x.AdminModule)
      },
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'index' },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminModule,
    RouterModule.forChild(routes),
  ]
})
export class BaseModule { }
