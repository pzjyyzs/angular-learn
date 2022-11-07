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

  getBanners(): Observable<Banner[]> {
    return this.http.get(this.url + 'banner')
      .pipe(map((res: { banners: Banner[]  }) => res.banners));
  }

  getTopPlaylist(): Observable<SongSheet[]> {
    return this.http.get(this.url + '/personalized?limit=8').
      pipe(map((res: { result: SongSheet[]}) =>  res.result));
  }
}
