import { NgModule, InjectionToken } from '@angular/core';
import { httpInterceptorProvides } from './http-interceptors';
import { environment } from 'src/environments/environment';


export const API_CONFIG = new InjectionToken('ApiConfigToken');
export const WINDOW =  new InjectionToken('WindowToken');
@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
     // /api/
    // { provide: API_CONFIG, useValue: 'http://localhost:3000/' },
    { provide: API_CONFIG, useValue: environment.production ? '/' : '/api/' },
    httpInterceptorProvides
  ]
})
export class ServiceModule { }
