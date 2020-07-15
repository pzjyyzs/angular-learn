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
import { RecommendModule } from './pages/page/recommend/recommend.module';
import { ProductModule } from './pages/page/product/product.module';
import { MyModule } from './pages/page/my/my.module';
import { ChatModule } from './pages/page/chat/chat.module';
import { CategoryModule } from './pages/page/category/category.module';

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
    HomeModule,
    RecommendModule,
    ProductModule,
    MyModule,
    ChatModule,
    CategoryModule
  ],
  exports: [
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
