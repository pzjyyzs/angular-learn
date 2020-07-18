import { Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductVariant } from '../../domain';
import { map, filter, switchMap } from 'rxjs/internal/operators';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductVariantDialogComponent } from '../product-variant-dialog/product-variant-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  variants$: Observable<ProductVariant[]>;
  selectedIndex = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialogService: DialogService) { }

  ngOnInit() {
    const productId$ = this.route.paramMap.pipe(
      filter(params => params.has('productId')),
      map(params => params.get('productId'))
    );
    this.variants$ = productId$.pipe(switchMap((productId: string) => this.orderService.getProductVariantsByProductId(productId)));
  }
  handleDirectBuy(variants: ProductVariant[]) {

  }

  handleGroupBuy(variants: ProductVariant[]) {
    const top = 40;
    const formSubmitted = new EventEmitter();
    formSubmitted.subscribe(ev => {
      this.dialogService.saveData(ev);
      this.router.navigate(['/order/confirm']);
    })

    const selected = new EventEmitter();
    selected.subscribe(ev => {
      this.selectedIndex = ev;
    })
    this.dialogService.open(ProductVariantDialogComponent, {
      inputs: {
        variants,
        selectedVariantIndex: this.selectedIndex
      },
      outputs: {
        formSubmitted,
        selected
      },
      position: {
        top: `${top}%`,
        left: '0',
        width: '100%',
        height: `${100 - top}`
      }
    });
  }
}
