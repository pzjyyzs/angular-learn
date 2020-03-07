import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { Song } from 'src/app/service/data-types/common.types';
import { getSongList, getPlayList, getCurrentIndex, getPlayMode, getCurrentSong, getPlayer } from 'src/app/selectors/player.selectors';
import { PlayMode } from './player-type';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {


  songList: Song[];
  playList: Song[];
  currentIndex: number;
  currentSong: Song;
  @ViewChild('audio', { static: true }) private audio: ElementRef;
  private audioEl: HTMLAudioElement;
  constructor(
    private store$: Store<AppStoreModule>
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => this.watchList(list, 'songList'));
    appStore$.pipe(select(getPlayList)).subscribe(list => this.watchList(list, 'playList'));
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => this.watchCurrentIndex(index));
    appStore$.pipe(select(getPlayMode)).subscribe(mode => this.watchPlayMode(mode));
    appStore$.pipe(select(getCurrentSong)).subscribe(song => this.watchCurrentSong(song));
    //appStore$.pipe(select(getCurrentAction)).subscribe(action => this.watchCurrentAction(action));
   }

  ngOnInit() {
    this.audioEl = this.audio.nativeElement;
  }

  private watchList(list: Song[], type: string) {
    this[type] = list;
  }
  private watchCurrentIndex(index: number) {
    this.currentIndex = index;
  }
  private watchPlayMode(mode: PlayMode) {
    console.log(mode);
  }
  private watchCurrentSong(song: Song) {
    this.currentSong = song;
  }

  onCanplay() {
    this.play();
  }
  private play() {
    this.audioEl.play();
  }
}
