import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile, MyService } from 'src/app/services/my.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {

  profile$: Observable<Profile>;
  orderItems = [
    {
      title: '待付款',
      icon: '/assets/icons/to_pay.png'
    },
    {
      title: '待分享',
      icon: '/assets/icons/to_share.png'
    },
    {
      title: '待发货',
      icon: '/assets/icons/to_ship.png'
    },
    {
      title: '待收货',
      icon: '/assets/icons/to_deliver.png'
    },
    {
      title: '待评价',
      icon: '/assets/icons/to_review.png'
    }
  ];
  toolsItems = [
    {
      title: '优惠券',
      icon: '/assets/icons/coupon.png'
    },
    {
      title: '商品收藏',
      icon: '/assets/icons/fav_product.png'
    },
    {
      title: '店铺收藏',
      icon: '/assets/icons/fav_store.png'
    },
    {
      title: '历史浏览',
      icon: '/assets/icons/history.png'
    },
    {
      title: '退款售后',
      icon: '/assets/icons/refund.png'
    }
  ];
  constructor(private myService: MyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.profile$ = this.myService.getProfile();
  }

  showProfile() {
    this.router.navigate(['profile'], { relativeTo: this.route });
  }
}
