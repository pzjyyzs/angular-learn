import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-stock-selector',
  template: `
    <div class="stock-selector" [formGroup]="parent">
      <div formGroupName="selector">
        <select formControlName="product_id">
          <option value="">Select stock</option>
          <option
            *ngFor="let product of products"
            [value]="product.id">
            {{ product.name }}
          </option>
        </select>
        <input
          type="number"
          step="10"
          min="10"
          max="1000"
          formControlName="quantity">
        <button type="button">
          Add stock
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./stock-selector.component.less']
})
export class StockSelectorComponent implements OnInit {
  @Input() parent!: FormGroup;
  @Input() products: Product[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
