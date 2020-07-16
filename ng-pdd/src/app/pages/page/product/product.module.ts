import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { ProductComponent } from './component/product/product.component';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    ShareModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
