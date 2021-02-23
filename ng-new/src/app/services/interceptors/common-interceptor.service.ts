import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthKey } from './../../configs/contsant';
import { catchError } from 'rxjs/internal/operators';
import { WindowService } from '../window.service';

@Injectable()
export class CommonInterceptorService implements HttpInterceptor {

  constructor(private windowServe: WindowService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.windowServe.getStorage(AuthKey);
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
      this.windowServe.alert('请求失败');
    }
    return throwError(error);
  }
}
