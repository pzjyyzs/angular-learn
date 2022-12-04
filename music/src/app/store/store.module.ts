import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { playerReducer } from './reducer/play.reducer';



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
    })
  ]
})
export class StoreIndexModule { }
