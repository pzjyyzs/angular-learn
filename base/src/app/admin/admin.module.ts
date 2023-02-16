import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// containers
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';
// components
import { DonutCardComponent } from './containers/donut-card/donut-card.component';
import { DonutFormComponent } from './containers/donut-form/donut-form.component';


@NgModule({
  declarations: [
    DonutListComponent,
    DonutCardComponent,
    DonutSingleComponent,
    DonutFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DonutListComponent, DonutSingleComponent]
})
export class AdminModule { }
