import { environment } from './../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { playerReducer } from './reducer/play.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ player: playerReducer }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class StoreIndexModule { }
