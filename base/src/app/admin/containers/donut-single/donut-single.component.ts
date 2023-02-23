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
    this.donutService.readOne('xxx').subscribe((donut: Donut) => {
      this.donut = donut
    });
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut).subscribe(() => console.log('create success'));
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut).subscribe(() => console.log('update successfully'));
  }

  onDelete(donut: Donut) {
    this.donutService.delete(donut).subscribe(() => console.log('Deleted successfully'));
  }
}
