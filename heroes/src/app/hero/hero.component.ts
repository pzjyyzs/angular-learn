import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/assets/mock-hero';
import { Hero } from 'src/assets/type';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes: Hero[] = [];
  selectedHero?: Hero;
  constructor(private heroService: HeroService, /* private messageService: MessageService */) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /* onSelect(hero: Hero): void {
    if (this.selectedHero === hero) {
      this.selectedHero = null;
    } else {
      this.selectedHero = hero;
      this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    }
  } */

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(data => this.heroes = data);
  }
}
