import { HttpErrorResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_CONFIG, ServicesModule } from './services.module';
import *  as queryString from 'query-string';
import { LoginParams, SampleBack, User } from './member.types';


@Injectable({
  providedIn: ServicesModule
})
export class UserService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) { }

  getUser(args: { uid: number }): Observable<any> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get<any>(this.url + '/user/detail', { params })
      .pipe(map((res: any) => res))
  }

  login(formValue: LoginParams): Observable<User> {
    const params = new HttpParams({ fromString: queryString.stringify(formValue) });
    return this.http.get(this.url + '/login/cellphone', { params })
      .pipe(map(res => res as User), catchError(this.handlerError));
  }

  sendCode(phone: number): Observable<number> {
    const params = new HttpParams({ fromString: queryString.stringify({ phone }) });
    return this.http.get<SampleBack>(this.url + '/captcha/sent', { params })
      .pipe(map((res: SampleBack) => res.code));
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError(() => {
      console.log('service handle error: ' + error);
      return '服务器无法访问';
    });
  }
}
