import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Base, Hero } from '../heroes/home/add-hero/types';
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
      catchError(error => this.handlerError(error))
      );
  }

  addHero(args: HeroArg): Observable<any> {
    const params = new HttpParams({ fromString: stringify(args)});
    return this.http.post(this.prefix + 'add', args)
    .pipe(
      map((res: Base<any[]>) => res.data),
      catchError(error => this.handlerError(error))
    );
  }

  private handlerError(error: HttpErrorResponse): Observable<never> {
    if (typeof error.error?.code === 'number') {
      alert(error.error.message);
    } else {
      alert('请求失败');
    }
    return throwError(error);
  }
}
