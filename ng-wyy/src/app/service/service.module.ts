import { NgModule, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { platform } from 'os';


export const API_CONFIG = new InjectionToken('ApiConfigToken');
export const WINDOW =  new InjectionToken('WindowToken');
@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: API_CONFIG, useValue: 'http://localhost:3000/' },
    {
      provide: WINDOW,
      useFactory(platformId: Object): Window | object {
        return  isPlatformBrowser(platformId) ? window : {};
      },
      deps: [PLATFORM_ID]
    }
  ]
})
export class ServiceModule { }
