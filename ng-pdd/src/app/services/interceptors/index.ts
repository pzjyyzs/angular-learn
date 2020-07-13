import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParamInterceptor } from './params.interceptors';
import { NotificationInterceptor } from './notification.interceptors';

export const httpInterceptorProvides = [
  { provide: HTTP_INTERCEPTORS, useClass: ParamInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true},

];
