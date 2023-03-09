import { Product } from './models/product.interface';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-inventory',
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <app-stock-branch
          [parent]="form">
        </app-stock-branch>
        <app-stock-selector [parent]="form" [products]="products">
        </app-stock-selector>
        <app-stock-products
          [parent]="form">
        </app-stock-products>
        <div class="stock-inventory__buttons">
          <button
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
        </div>
        <pre>{{ form.value | json }}</pre>
      </form>
    </div>
  `,
  styleUrls: ['./stock-inventory.component.less']
})
export class StockInventoryComponent implements OnInit {

  products: Product[] = [
    { id: 1, price: 3000, name: 'banner' },
    { id: 1, price: 10, name: 'apple' },
    { id: 1, price: 3, name: 'peach' },
    { id: 1, price: 20, name: 'banana' },
    { id: 1, price: 10, name: 'orange' },
    { id: 1, price: 4, name: 'melon' },
  ];
  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl('B182'),
      code: new FormControl('1234')
    }),
    selector: new FormGroup({
      product_id: new FormControl(''),
      quantity: new FormControl(10)
    }),
    stock: new FormArray([])
  })
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit', this.form.value)
  }
}
