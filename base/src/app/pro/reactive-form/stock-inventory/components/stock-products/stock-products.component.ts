import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-products',
  template: `
    <div class="stock-product" [formGroup]="parent">
      <div formArrayName="stock">
        <div *ngFor="let item of stocks;let i  = index;">
          <div class="stock-product__content" [formGroupName]="i">
            <div class="stock-product__name">
              {{ item.value.product_id }}
            </div>
            <input type="number" step="10" min="10" max="1000" formControlName="quantity" />
            <button type="button">Remove</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./stock-products.component.less']
})
export class StockProductsComponent implements OnInit {
  @Input() parent!: FormGroup;

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls
  }
  constructor() { }

  ngOnInit(): void {
  }

}
