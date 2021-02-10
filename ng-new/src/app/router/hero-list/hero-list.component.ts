import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  selectedId: number;
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.heroService.getHeroes();
  }

  onSelect(id: number) {
    this.selectedId = id;
  }
}
