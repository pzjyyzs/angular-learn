import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Song } from '../services/data-types';
import { SetPlayList } from './actions/play.action';
import { PlayState } from './reducer/play.reducer';
import { getPlayer } from './selector/player.selector';
import { StoreIndexModule } from './store.module';

@Injectable({
  providedIn: StoreIndexModule
})
export class BatchActionService {

  private playerState: PlayState;

  constructor(private store$: Store<StoreIndexModule>) {
    this.store$.pipe(select(getPlayer)).subscribe(res => {
      console.log('123', res)
      this.playerState = res
    });
    // this.store$.pipe(select(getMember)).subscribe(res => this.memberState = res);
   }

  insertSong(song: Song) {
    //let songList = this.playerState.songList.slice();
    let playList = this.playerState.playList.slice();
    let isSongHas = playList.find(item => item.id === song.id);
    if (!isSongHas) {
      playList.push(song);
      this.store$.dispatch(SetPlayList({ playList }));
    }
  }
}
