import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthKey } from './../../configs/contsant';
import { catchError } from 'rxjs/internal/operators';

@Injectable()
export class CommonInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = localStorage.getItem(AuthKey);
    let httpConfig = {};
    if (auth) {
      httpConfig = { headers: req.headers.set(AuthKey, auth)};
    }
    const copyReq = req.clone(httpConfig);
    return next.handle(copyReq).pipe(catchError(error =>  this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (typeof error.error?.code === 'number') {
      alert(error.error.message);
    } else {
      alert('请求失败');
    }
    return throwError(error);
  }
}
