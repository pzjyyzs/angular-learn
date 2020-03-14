import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SongSheet, SongUrl, Song, Lyric } from './data-types/common.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: ServiceModule
})
export class SongService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

 getSongUrl(ids: string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id', ids);
    return this.http.get(this.uri + 'song/url', { params })
      .pipe(map((res: { data: SongUrl[] }) => res.data));
  }

  getSongList(songs: Song | Song[]):Observable<Song[]>  {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(item => item.id).join(',');
    return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls)));
  }

  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result = [];
    songs.forEach(song => {
      const url = urls.find(url => url.id === song.id).url;
      if (url) {
        result.push({...song, url});
      }
    });
    return result;
  }

  getLyric(id: number): Observable<Lyric> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.uri + 'lyric', { params }).pipe(map(res => res as Lyric));
  }
}
