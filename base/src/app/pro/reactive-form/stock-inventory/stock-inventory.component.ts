import { StockInventoryService } from './services/stock-inventory.service';
import { Item, Product } from './models/product.interface';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, map } from 'rxjs';
import { StockValidators } from './stock-inventory.validators';

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
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)"
        >
        </app-stock-products>

        <div>
          Total: {{ total | currency:'USD':true }}
        </div>
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

  products: Product[] = [];
  productMap!: Map<number, Product>;
  total: number = 0;
  form = this.fb.group({
    store: this.fb.group({
      branch: ['', [Validators.required, StockValidators.checkBranch], [this.validateBranch.bind(this)]],
      code: ['', Validators.required]
    }),
    selector: this.createStock({ product_id: 0, quantity: 0 }),
    stock: this.fb.array<Item[]>([])
  }, { validator: StockValidators.checkStockExists })
  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) { }

  ngOnInit(): void {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();
    forkJoin([cart, products]).subscribe(([cart, products]: [Item[], Product[]]) => {
      const myMap = products.map<[number, Product]>(product => [product.id, product]);
      this.productMap = new Map<number, Product>(myMap);
      this.products = products;

      cart.forEach(item => this.addStock(item));

      this.calculateTotal(this.form.get('stock')!.value);
      if (this.form.get('stock')) {
        this.form.get('stock')!.valueChanges.subscribe((value) => {
          this.calculateTotal(value)
        })
      }
    });
  }

  calculateTotal(value: (Item | null)[]) {
    if (value.length && value[0]) {
      const total = value.reduce((prev: number, next: { quantity: number; product_id: number; } | null) => {
        if (next) {
          return prev + (next.quantity * this.productMap.get(next.product_id)!.price)
        }
        return 0;
      }, 0)
      this.total = total;
    }
  }

  createStock(stock: { product_id: number, quantity: number }) {
    return this.fb.group({
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

  removeStock({ group, index }: { group: FormGroup, index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  validateBranch(control: AbstractControl) {
    return this.stockService
      .checkBranchId(control.value)
      .pipe(
        map((res: boolean) => {
          return res ? null : { unknownBranch: true }
        })
      )
  }
}
