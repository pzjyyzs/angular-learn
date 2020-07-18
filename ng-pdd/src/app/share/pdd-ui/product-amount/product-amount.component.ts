import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-amount',
  templateUrl: './product-amount.component.html',
  styleUrls: ['./product-amount.component.css']
})
export class ProductAmountComponent implements OnInit {

  @Input() count = 0;
  @Output() amountChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleDecrease() {
    if (this.count <= 0) {
      return;
    }
    this.amountChange.emit(--this.count);
  }

  handleIncrease() {
    this.amountChange.emit(++this.count);
  }
}
