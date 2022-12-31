import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Song } from '../services/data-types';
import { findIndex, shuffle } from '../utils/array';
import { SetPlayList, SetSongList, SetCurrentIndex } from './actions/play.action';
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

  insertSong(song: Song, isPlay: boolean) {
    let songList = this.playerState.songList.slice();
    let playList = this.playerState.playList.slice();
    let insertIndex = this.playerState.currentIndex;
    let isSongHas = playList.find(item => item.id === song.id);
    const pIndex = findIndex(playList, song);
    if (pIndex > -1) {
      if (isPlay) {
        insertIndex = pIndex;
      }
    } else {
      songList.push(song);
      if (isPlay) {
        insertIndex = songList.length - 1;
      }

      if (this.playerState.playMode.type === 'random') {
        playList = shuffle(songList);
      } else {
        playList.push(song);
      }
      this.store$.dispatch(SetSongList({ songList }));
      this.store$.dispatch(SetPlayList({ playList }));
    }

    if (insertIndex !== this.playerState.currentIndex) {
      this.store$.dispatch(SetCurrentIndex({ currentIndex: insertIndex }));
    }
  }
}
