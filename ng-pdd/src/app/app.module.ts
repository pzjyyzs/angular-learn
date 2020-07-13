import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share/share.module';
import { PageModule } from './pages/page/page.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { ServiceModule } from './services/service.module';
import { ParamInterceptor } from './services/interceptors/params.interceptors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ShareModule,
    PageModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceModule,
    HomeModule
  ],
  exports: [
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
