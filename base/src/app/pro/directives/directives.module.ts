import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesComponent } from './directives.component';
import { CreditCardDirective } from './credit-card.directive';
import { TooltipDirective } from './tooltip.directive';
import { MyForDirective } from './my-for.directive';



@NgModule({
  declarations: [
    TooltipDirective,
    DirectivesComponent,
    CreditCardDirective,
    MyForDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
