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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero(name)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
