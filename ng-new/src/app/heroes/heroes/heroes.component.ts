import { Component, OnInit } from '@angular/core';
import { Hero, HeroArg } from 'src/app/configs/types';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  searchParams: HeroArg = {
    name: '',
    job: '',
    sort: 'desc'
  };
  heros: Hero[] = [];
  constructor(private heroServe: HeroService) {
  }

  ngOnInit() {
   this.heroServe.heroes();
  }

  search() {
    console.log(this.searchParams);
  }
}
