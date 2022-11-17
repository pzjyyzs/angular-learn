import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from './services.module';
import *  as queryString from 'query-string';


@Injectable({
  providedIn: ServicesModule
})
export class UserService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getUser(args: { uid: number }): Observable<any> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get<any>(this.url + '/user/detail', { params })
      .pipe(map((res: any) => res))
  }
}
