import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';



@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
