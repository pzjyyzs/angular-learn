import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollableTabComponent } from './pages/scrollable-tab/scrollable-tab.component';
import { ShareModule } from './share/share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    ScrollableTabComponent,
  ],
  imports: [
    BrowserModule,
    ShareModule,
    AppRoutingModule
  ],
  exports: [
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
