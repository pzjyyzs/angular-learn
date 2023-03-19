import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './reactive-form.component';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { StockCounterComponent } from './stock-inventory/components/stock-counter/stock-counter.component';

@NgModule({
  declarations: [
    ReactiveFormComponent,
  ],
  imports: [
    StockInventoryModule,
    CommonModule
  ]
})
export class ReactiveFormModule { }
