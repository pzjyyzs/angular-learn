import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banner } from './data-types';
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
}
