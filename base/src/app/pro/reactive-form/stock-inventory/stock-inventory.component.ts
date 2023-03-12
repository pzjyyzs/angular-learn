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
        <app-stock-selector [parent]="form" [products]="products" (added)="addStock($event)">
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
    { id: 2, price: 10, name: 'apple' },
    { id: 3, price: 3, name: 'peach' },
    { id: 4, price: 20, name: 'banana' },
    { id: 5, price: 10, name: 'orange' },
    { id: 6, price: 4, name: 'melon' },
  ];
  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl('B182'),
      code: new FormControl('1234')
    }),
    selector: this.createStock({ product_id: 0, quantity: 0 }),
    stock: new FormArray([
      this.createStock({ product_id: 1, quantity: 10 }),
      this.createStock({ product_id: 3, quantity: 50 })
    ])
  })
  constructor() { }

  ngOnInit(): void {
  }

  createStock(stock: { product_id: number, quantity: number }) {
    return new FormGroup({
      product_id: new FormControl(stock.product_id || ''),
      quantity: new FormControl(stock.quantity || 10)
    })
  }

  addStock(stock: { product_id: number; quantity: number; }) {
    const control = this.form.get('stock') as FormArray;
    console.log('123', stock)
    control.push(this.createStock(stock));
  }

  onSubmit() {
    console.log('submit', this.form.value)
  }
}
