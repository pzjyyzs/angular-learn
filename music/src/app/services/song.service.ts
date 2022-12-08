import { Dj, Singer, Song, SongUrl } from './data-types';
import { map, Observable } from 'rxjs';
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

  getSongUrl(ids: string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id', ids);
    return this.http.get<{data: SongUrl[]}>(this.url + '/song/url', { params })
      .pipe(map((res: { data: SongUrl[] }) => res.data));
  }

  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(item => item.id).join(',');
    return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls)));
  }

  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result: Song[] = [];
    songs.forEach(song => {
      const item = urls.find(url => url.id === song.id);
      if (item && item.url) {
        result.push({ ...song, url: item.url });
      }
    });
    return result;
  }
}
