import { map, Observable, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from './services.module';

@Injectable({
  providedIn: ServicesModule
})
export class SongService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getSheet(id: number): Observable<any> {
    return this.http.get<any[]>(this.url + `/playlist/detail?id=${id}`)
      .pipe(map(res => res));
  }
}
