import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Base, Hero } from '../heroes/home/add-hero/types';
import { map } from 'rxjs/operators';
import { HeroArg } from '../heroes/home/add-hero/types';
import { stringify } from 'qs';

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
    .pipe(map((res: Base<Hero[]>) => res.data));
  }
}