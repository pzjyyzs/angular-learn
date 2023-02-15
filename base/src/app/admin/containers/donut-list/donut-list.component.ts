import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut';

@Component({
  selector: 'app-donut-list',
  templateUrl: './donut-list.component.html',
  styleUrls: ['./donut-list.component.less']
})
export class DonutListComponent implements OnInit {

  donuts: Array<Donut> = [];
  constructor() { }

  ngOnInit(): void {
    this.donuts = [
      {
        id: 'y8z0As',
        name: 'Just Chocolate',
        icon: 'just-chocolate',
        price: 119,
        promo: 'limited',
        description: 'For the pure chocoholic.'
      },
      {
        id: '3u98kl',
        name: 'Glazed Fudge',
        icon: 'glazed-fudge',
        price: 129,
        promo: 'new',
        description: 'Sticky perfection.'
      },
      {
        id: 'ae098s',
        name: 'Caramel Swirl',
        icon: 'caramel-swirl',
        price: 129,
        description: 'Chocolate drizzled with caramel'
      },
      {
        id: '8amkz9',
        name: 'Sour Superme',
        icon: 'sour-superme',
        price: 139,
        description: 'For the sour advocate'
      },
      {
        id: 'l3M0nz',
        name: 'Zesty Lemon',
        icon: 'zesty-lemon',
        price: 129,
        description: 'Delicious lucious lemon.'
      }
    ]
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
