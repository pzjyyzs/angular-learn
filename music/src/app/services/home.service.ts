import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banner, SongSheet } from './data-types';
import { API_CONFIG, ServicesModule } from './services.module';

@Injectable({
  providedIn: ServicesModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getBanners(): Observable<any> {
    return this.http.get<{ banners: Banner[]}>(this.url + 'banner')
      .pipe(map((res: { banners: Banner[]}) => res.banners));
  }

  getTopPlaylist(): Observable<SongSheet[]> {
    return this.http.get<{ result: SongSheet[]}>(this.url + '/personalized?limit=8').
      pipe(map((res: { result: SongSheet[]}) =>  res.result));
  }
}
