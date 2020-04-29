import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { LoginParams } from '../share/wy-ui/wy-layer/wy-layer-login/wy-layer-login.component';
import { User } from './data-types/member.types';
import queryString from 'query-string';
import { SampleBack } from './data-types/common.types';

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

  logout(): Observable<sampleBack> {
    return this.http.get(this.uri + 'logout' )
    .pipe(map(res => res as sampleBack));
  }
}
