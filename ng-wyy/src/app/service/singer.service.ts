import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Singer, SingerDetail } from './data-types/common.types';
import queryString from 'query-string';
import { SingerDetailComponent } from '../pages/singer/singer-detail/singer-detail.component';

type SingerParams = {
  offset: number;
  limit: number;
  cat?: string;
}
const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}
@Injectable({
  providedIn: ServiceModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get(this.uri + 'artist/list', { params })
      .pipe(map((res: { artists: Singer[] }) => res.artists));
  }

  getSingerDetail(id: string): Observable<SingerDetail> {
    const params = new HttpParams().set(id, id);
    return this.http.get(this.uri + 'artists', { params })
    .pipe(map(res => res as SingerDetail));
  }

  getSimiSinger(id: string): Observable<Singer[]> {
    const params = new HttpParams().set(id, id);
    return this.http.get(this.uri + 'simi/artist', { params })
    .pipe(map((res: { artists: Singer[] }) => res.artists));
  }
}
