import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProComponent } from './pro/index/pro.component';

const routes: Routes = [
  {
    path: 'pro',
    loadChildren: () => import('./pro/pro.module').then(x => x.ProModule)
  },
  {
    path: 'base',
    loadChildren: () => import('./base/base.module').then(x => x.BaseModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'base'
  },
  {
    path: '**',
    redirectTo: 'base'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
