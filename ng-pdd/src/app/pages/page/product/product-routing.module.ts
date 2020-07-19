import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { ConfirOrderComponent } from './component/confir-order/confir-order.component';


const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: ':productId',
        component: ProductComponent
      }
    ]
  },
  {
    path: 'orders/confirm',
    component: ConfirOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
