import { DonutService } from './../../service/donut.service';
import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut';

@Component({
  selector: 'app-donut-list',
  templateUrl: './donut-list.component.html',
  styleUrls: ['./donut-list.component.less']
})
export class DonutListComponent implements OnInit {

  donuts: Array<Donut> = [];
  constructor(private donutservice: DonutService) { }

  ngOnInit(): void {
    this.donuts = this.donutservice.read();
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
