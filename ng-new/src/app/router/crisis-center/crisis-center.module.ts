import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CrisisCenterComponent } from './crisis-center.component';


const routes: Routes = [
  /*  { path: 'crisi', component: CrisisListComponent }, */
  {
    path: 'crisi',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent
      }
    ]
  },
];
@NgModule({
  declarations: [CrisisListComponent, CrisisCenterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CrisisCenterModule { }
