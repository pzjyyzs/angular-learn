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


const routes: Routes = [
  { path: 'donuts', component: DonutListComponent },
  { path: 'donut', component: DonutSingleComponent },
  { path: '', pathMatch: 'full', redirectTo: 'donuts' },
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
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [DonutListComponent, DonutSingleComponent]
})
export class AdminModule { }
