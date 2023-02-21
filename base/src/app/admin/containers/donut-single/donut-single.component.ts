import { DonutService } from './../../service/donut.service';
import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut';

@Component({
  selector: 'app-donut-single',
  templateUrl: './donut-single.component.html',
  styleUrls: ['./donut-single.component.less']
})
export class DonutSingleComponent implements OnInit {

  donut!: Donut;
  constructor(private donutService: DonutService) { }

  ngOnInit(): void {
    this.donutService.readOne('y8z0As').subscribe((donut: Donut) => {
      this.donut = donut
    });
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut);
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut);
  }

  onDelete(donut: Donut) {
    this.donutService.delete(donut);
  }
}
