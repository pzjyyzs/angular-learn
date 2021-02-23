import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Base, Hero, UpdateHeroArg } from '../heroes/home/add-hero/types';
import { map } from 'rxjs/operators';
import { HeroArg } from '../heroes/home/add-hero/types';
import { stringify } from 'qs';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private prefix = environment.baseUrl + '/hero/';
  constructor(private http: HttpClient) { }

  heroes(args: HeroArg): Observable<Hero[]> {
    /* const params = new HttpParams().set('name', args.name); */
    const params = new HttpParams({ fromString: stringify(args)});
    return this.http.get(this.prefix + 'list', { params })
    .pipe(
      map((res: Base<Hero[]>) => res.data),
      );
  }

  addHero(args: UpdateHeroArg): Observable<Base<void>> {
    return this.http.post(this.prefix + 'add', args)
    .pipe(
      map((res: Base<void>) => res)
    );
  }

}
