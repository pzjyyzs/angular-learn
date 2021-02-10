import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './hero-list/hero-list.component';


const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
];
@NgModule({
  declarations: [HeroListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroModule { }
