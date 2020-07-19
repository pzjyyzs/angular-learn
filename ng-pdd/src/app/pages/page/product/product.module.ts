import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { ProductComponent } from './component/product/product.component';
import { GroupShortListComponent } from './component/group-short-list/group-short-list.component';
import { GroupItemComponent } from './component/group-item/group-item.component';
import { ProductVariantDialogComponent } from './component/product-variant-dialog/product-variant-dialog.component';
import { ConfirOrderComponent } from './component/confir-order/confir-order.component';
import { PaymentComponent } from './component/payment/payment.component';



@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [ProductComponent, GroupShortListComponent, GroupItemComponent, ConfirOrderComponent, ProductVariantDialogComponent, PaymentComponent],
  imports: [
    ShareModule,
    ProductRoutingModule
  ],
  exports: [ConfirOrderComponent],
  entryComponents: [ProductVariantDialogComponent]
})
export class ProductModule { }
