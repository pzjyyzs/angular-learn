import { Component, Input, OnInit } from '@angular/core';
import { Donut } from '../../models/donut';

@Component({
  selector: 'app-donut-card',
  templateUrl: './donut-card.component.html',
  styleUrls: ['./donut-card.component.less']
})
export class DonutCardComponent implements OnInit {

  @Input() donut!: Donut;
  constructor() { }

  ngOnInit(): void {
  }

}
