import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProvides } from './http-interceptors';

export const API_CONFIG = new InjectionToken('ApiConfigToken');

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: API_CONFIG, useValue: '/api' },
    httpInterceptorProvides
  ]
})
export class ServicesModule { }
