import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero, HeroArg } from '../home/add-hero/types';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  searchParams: HeroArg = {
    name: '',
    job: '',
    sort: 'desc'
  };
  heros: Hero[] = [];
  constructor(private heroServe: HeroService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  this.getList();
  }

  search() {
    this.getList();
  }

  getList() {
    this.heroServe.heroes(this.searchParams).subscribe(data => {
      console.log('data', data);
      this.heros = data;
      this.cdr.markForCheck();
    });
  }

  reset() {
    this.searchParams = {
      name: '',
      job: '',
      sort: 'desc'
    };
    this.getList();
  }
}
