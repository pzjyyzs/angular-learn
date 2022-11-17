import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const API_CONFIG = new InjectionToken('ApiConfigToken');

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: API_CONFIG, useValue: '/api' }
  ]
})
export class ServicesModule { }
