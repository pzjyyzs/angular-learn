import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'crisi', component: CrisisListComponent },
];
@NgModule({
  declarations: [CrisisListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CrisisCenterModule { }
