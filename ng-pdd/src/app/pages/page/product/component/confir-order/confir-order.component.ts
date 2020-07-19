import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { Observable, Subject, combineLatest, merge } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/internal/operators';
import { ProductVariant } from '../../domain';
import { Payment } from '../payment/payment.component';

@Component({
  selector: 'app-confir-order',
  templateUrl: './confir-order.component.html',
  styleUrls: ['./confir-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirOrderComponent implements OnInit {

  item$: Observable<any>;
  count$ = new Subject<number>();
  totalPrice$: Observable<number>;
  payments: Payment[];
  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.payments = this.payments = [
      {
        id: 1,
        name: '微信支付',
        icon: 'assets/icons/wechat_pay.png',
        desc: '50元以内可免密支付'
      },
      {
        id: 2,
        name: '支付宝',
        icon: 'assets/icons/alipay.png'
      },
      {
        id: 3,
        name: '找微信好友支付',
        icon: 'assets/icons/friends.png'
      }
    ];
    this.item$ = this.dialogService.getData().pipe(
      tap(val => console.log(val)),
      shareReplay(1)
    );
    const unitPrice$ = this.item$.pipe(
      map(
        (item: { variant: ProductVariant; count: number }) => item.variant.price
      )
    );
    const amount$ = this.item$.pipe(
      map((item: { variant: ProductVariant; count: number }) => item.count)
    );
    const mergedCount$ = merge(amount$, this.count$);
    this.totalPrice$ = combineLatest([unitPrice$, mergedCount$]).pipe(
      map(([price, amount]) => price * amount)
    );
  }

  handleAmountChange(count: number) {
    this.count$.next(count);
  }

  handlePay() {}
}
