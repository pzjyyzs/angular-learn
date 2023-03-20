import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
        <app-stock-counter [step]="10" [min]="10" [max]="1000" formControlName="quantity"></app-stock-counter>
        <button type="button" (click)="onAdd()" [disabled]="stockExists">
          Add stock
        </button>
        <div class="stock-selector__error" *ngIf="stockExists">
          Item already exists in the stock
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./stock-selector.component.less']
})
export class StockSelectorComponent implements OnInit {
  @Input() parent!: FormGroup;
  @Input() products: Product[] = [];
  @Output() added = new EventEmitter<any>();

  get stockExists() {
    return (
      this.parent.hasError('stockExists') &&
      this.parent.get('selector.product_id')?.dirty
    )
  }

  get noSelected() {
    return (
      !this.parent.get('selector.product_id')?.value
    )
  }

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.added.emit(this.parent.get('selector')!.value);
    this.parent.get('selector')!.reset({
      product_id: '',
      quantity: 10
    })
  }
}
