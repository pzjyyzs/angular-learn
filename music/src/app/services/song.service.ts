import { Dj, Singer } from './data-types';
import { map, Observable, combineLatest } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from './services.module';
import *  as queryString from 'query-string';

type SingerParams = {
  type?: number;
  area: number;
  limit: number;
}

type DjParams = {
  limit: number;
}

const defaultParams: SingerParams = {
  type: 1,
  area: 7,
  limit: 5,
}

const djParams: DjParams = {
  limit: 5,
}

@Injectable({
  providedIn: ServicesModule
})
export class SongService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getSheet(id: number): Observable<any> {
    return this.http.get<any[]>(this.url + `/playlist/detail?id=${id}`)
      .pipe(map(res => res));
  }

  getIndexSongList(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get<{ artists: Singer[] }>(this.url + '/artist/list', { params })
      .pipe(map((res: { artists: Singer[] }) => res.artists));
  }

  getTopListDj(args: DjParams = djParams): Observable<Dj[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get<{ data: { list: Dj[] }}>(this.url + '/dj/toplist/popular', { params })
      .pipe(map((res: { data: { list: Dj[] }}) => res.data.list));
  }
}
