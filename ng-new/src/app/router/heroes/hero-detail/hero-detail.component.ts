import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {

  hero$: Observable<Hero>;
  constructor(private router: Router, private route: ActivatedRoute, private heroService: HeroService) { }

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.heroService.getHero(params.get('id'));
      })
    )
    this.route.paramMap.subscribe(params => {
      this.heroService.getHero(params.get('id')).subscribe(hero => {

      })
    })
  }

  back(id: number) {
    this.router.navigate(['/heroes', { id }]);
  }
}
