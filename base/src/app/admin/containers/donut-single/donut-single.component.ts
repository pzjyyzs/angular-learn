import { DonutService } from './../../service/donut.service';
import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donut-single',
  templateUrl: './donut-single.component.html',
  styleUrls: ['./donut-single.component.less']
})
export class DonutSingleComponent implements OnInit {

  donut!: Donut;
  isEdit: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donutService: DonutService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.donutService.readOne(id).subscribe((donut: Donut) => {
      this.donut = donut
    });
    this.isEdit = this.route.snapshot.data['isEdit'];
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut).subscribe((item) => {

      this.router.navigate(['admin', 'donuts', item.id])
    });
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => console.log('onUpdate error', err)
    });
  }

  onDelete(donut: Donut) {
    this.donutService.delete(donut).subscribe(() => this.router.navigate(['admin']));
  }
}
