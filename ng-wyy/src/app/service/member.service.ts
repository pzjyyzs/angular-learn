import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { LoginParams } from '../share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { User, Signin, recordVal, UserRecord, UserSheet } from './data-types/member.types';
import queryString from 'query-string';
import { SampleBack, SongSheet } from './data-types/common.types';


export enum RecordType {
  allData,
  weekData
}
@Injectable({
  providedIn: ServiceModule
})
export class MemberService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }

  login(formValue: LoginParams): Observable<User> {
    const params = new HttpParams({ fromString: queryString.stringify(formValue) });
    return this.http.get(this.uri + 'login/cellphone', { params })
    .pipe(map((res) => res as User));
  }

  getUserDetail(uid: string): Observable<User> {
    const params = new HttpParams({ fromString: queryString.stringify({ uid }) });
    return this.http.get(this.uri + 'user/detail', { params })
    .pipe(map((res) => res as User));
  }

  logout(): Observable<SampleBack> {
    return this.http.get(this.uri + 'logout' )
    .pipe(map(res => res as SampleBack));
  }

  signin(): Observable<Signin> {
    const params = new HttpParams({ fromString: queryString.stringify({ type: 1 }) });
    return this.http.get(this.uri + 'daily signin', { params }).pipe(map(res => res as Signin));
  }

  getUserRecord(uid: string, type = RecordType.weekData): Observable<recordVal[]> {
    const params = new HttpParams({ fromString: queryString.stringify({ uid, type })});
    return this.http.get(this.uri + 'user/record', { params })
    .pipe(map((res: UserRecord) => res[RecordType[type]]));
  }

  getUserSheets(uid: string): Observable<UserSheet> {
    const params = new HttpParams({ fromString: queryString.stringify({ uid }) });
    return this.http.get(this.uri + 'user/playlist', { params })
    .pipe(map((res: { playlist: SongSheet[] }) => {
      const list = res.playlist;
      return {
        self: list.filter(item => !item.subscribed),
        subscribed: list.filter(item => item.subscribed)
      };
    }));
  }
}
