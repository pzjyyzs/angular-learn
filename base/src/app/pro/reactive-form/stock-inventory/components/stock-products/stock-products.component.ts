import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-products',
  template: `
    <!-- <div class="stock-product" [formGroup]="parent">
    </div> -->
  `,
  styleUrls: ['./stock-products.component.less']
})
export class StockProductsComponent implements OnInit {
  @Input() parent!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
