import { NgModule } from '@angular/core';
import { httpInterceptorProvides } from './interceptors';

@NgModule({
  providers: [
    httpInterceptorProvides
  ],
  declarations: []
})
export class ServiceModule { }
