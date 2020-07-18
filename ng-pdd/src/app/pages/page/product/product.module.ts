import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ShareModule } from 'src/app/share/share/share.module';
import { ProductComponent } from './component/product/product.component';
import { GroupShortListComponent } from './component/group-short-list/group-short-list.component';
import { GroupItemComponent } from './component/group-item/group-item.component';



@NgModule({
  declarations: [ ProductComponent, GroupShortListComponent, GroupItemComponent ],
  imports: [
    ShareModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
