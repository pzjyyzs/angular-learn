import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SongSheet, Song, SheetList } from './data-types/common.types';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/internal/operators';
import { SongService } from './song.service';
import { SheetListModule } from '../pages/sheet-list/sheet-list.module';
import queryString from 'query-string'

export type SheetParams = {
  offset: number;
  limit: number;
  order: 'new' | 'hot',
  cat: string
}
@Injectable({
  providedIn: ServiceModule
})
export class SheetService {

  constructor(private http: HttpClient,
     @Inject(API_CONFIG) private uri: string,
     private songServe: SongService) { }

  getSheets(args: SheetParams): Observable<SheetList> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get(this.uri + 'top/playlist', { params }).pipe(map(res => res as SheetList));
  }
  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.uri + 'playlist/detail', { params })
      .pipe(map((res: { playlist: SongSheet }) => res.playlist));
  }

  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id)
    .pipe(pluck('tracks'), switchMap(tracks => this.songServe.getSongList(tracks)));
  }
}
