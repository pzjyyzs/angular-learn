import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  constructor(private heroService: HeroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.heroes$ = this.heroService.getHeroes();
    // this.selectedId = +this.route.snapshot.paramMap.get('id');
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.heroService.getHeroes();
      })
    )
  }

  onSelect(id: number) {
    this.selectedId = id;
    this.router.navigateByUrl('/hero/' + id)
    // this.router.navigate(['/hero/', id])
  }
}
