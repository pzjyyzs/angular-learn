import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// containers
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';
// components
import { DonutCardComponent } from './containers/donut-card/donut-card.component';
import { DonutFormComponent } from './containers/donut-form/donut-form.component';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  { path: 'donuts', component: DonutListComponent },
  { path: 'donuts/new', component: DonutSingleComponent, data: { isEdit: false } },
  { path: 'donuts/:id', component: DonutSingleComponent, data: { isEdit: true } },
  { path: '', pathMatch: 'full', redirectTo: 'base/index/admin/donuts' },
]
@NgModule({
  declarations: [
    DonutListComponent,
    DonutCardComponent,
    DonutSingleComponent,
    DonutFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [DonutListComponent, DonutSingleComponent]
})
export class AdminModule { }
