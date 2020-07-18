import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { ProductComponent } from './component/product/product.component';
import { GroupShortListComponent } from './component/group-short-list/group-short-list.component';
import { GroupItemComponent } from './component/group-item/group-item.component';
import { ProductVariantDialogComponent } from './component/product-variant-dialog/product-variant-dialog.component';



@NgModule({
  declarations: [ProductComponent, GroupShortListComponent, GroupItemComponent, ProductVariantDialogComponent],
  imports: [
    ShareModule,
    ProductRoutingModule
  ],
  entryComponents: [ProductVariantDialogComponent]
})
export class ProductModule { }
