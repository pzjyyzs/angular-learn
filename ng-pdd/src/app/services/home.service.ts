import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { Channel } from '../share/pdd-ui/horizontal-grid/horizontal-grid.component';
import { ServiceModule } from './service.module';

@Injectable({
  providedIn: ServiceModule
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBanners(): Observable<ImageSlider[]> {
    return this.http.get(`${environment.baseUrl}/banners`)
      .pipe(map((res: ImageSlider[]) => res));
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get(`${environment.baseUrl}/channels`)
      .pipe(map((res: Channel[]) => res));
  }

  getTabs(): Observable<TopMenu[]> {
    return this.http.get(`${environment.baseUrl}/tabs`)
    .pipe(map((res) => res as TopMenu[]));
  }
}
