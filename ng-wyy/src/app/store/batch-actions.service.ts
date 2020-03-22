import { Injectable } from '@angular/core';
import { AppStoreModule } from '.';
import { Song } from '../service/data-types/common.types';
import { Store, select } from '@ngrx/store';
import { PlayState } from '../reducers/player.reducer';
import { SetSongList, SetPlayList, SetCurrentIndex } from '../actions/player.action';
import { shuffle, findIndex } from 'src/utils/array';
import { getPlayer } from '../selectors/player.selectors';

@Injectable({
  providedIn: AppStoreModule
})
export class BatchActionsService {

  private playerState: PlayState;
  constructor(private store$: Store<AppStoreModule>) {
    this.store$.pipe(select(getPlayer)).subscribe(res => this.playerState = res);
   }

  selectPlayList({ list, index}: { list: Song[], index: number}) {
    this.store$.dispatch(SetSongList({ songList: list }));
    let trueIndex = index;
    let trueList = list.slice();

    if (this.playerState.playMode.type === 'random') {
      trueList = shuffle(list || []);
      trueIndex = findIndex(trueList, list[trueIndex]);
    }
    this.store$.dispatch(SetPlayList({ playList: list }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: trueIndex }));
  }

  deleteSong(song: Song) {
    const songList = this.playerState.songList.slice();
    const playList = this.playerState.playList.slice();
    let currentIndex = this.playerState.currentIndex;
    const sIndex = findIndex(songList, song);
    songList.splice(sIndex, 1);
    const pIndex = findIndex(playList, song);
    playList.splice(pIndex, 1);

    if (currentIndex > pIndex || currentIndex === playList.length) {
      currentIndex--;
    }

    this.store$.dispatch(SetSongList({ songList }));
    this.store$.dispatch(SetPlayList({ playList }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex }));
  }

  clearSong() {
    this.store$.dispatch(SetSongList({ songList: [] }));
        this.store$.dispatch(SetPlayList({ playList: [] }));
        this.store$.dispatch(SetCurrentIndex({ currentIndex: -1 }));


  }
}
