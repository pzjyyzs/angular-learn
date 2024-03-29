import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '../share/share.module';
import { PagesModule } from '../pages/pages.module';
import en from '@angular/common/locales/en';
import { ServicesModule } from '../services/services.module';
import { StoreIndexModule } from '../store/store.module';

registerLocaleData(en);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShareModule,
    ServicesModule,
    PagesModule,
    StoreIndexModule,
    AppRoutingModule,
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ]
})
export class CoreModule {
  // 保证只引入一次
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被AppModuley引入');
    }
  }
 }
