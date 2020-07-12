import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBanners() {
    return this.http.get(`${environment.baseUrl}/banners`,
      { params: { icode: `${environment.icode}` } });
  }

  getChannels() {
    return this.http.get(`${environment.baseUrl}/channels`,
      { params: { icode: `${environment.icode}` } });
  }

  getTabs() {
    return this.http.get(`${environment.baseUrl}/tabs`,
    { params: { icode: `${environment.icode}` } })
    .pipe(map((res) => res as TopMenu[]));
  }
}
