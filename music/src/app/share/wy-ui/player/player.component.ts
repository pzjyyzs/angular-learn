import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Song } from 'src/app/services/data-types';
import { getCurrentSong, getPlayer, getPlayList } from 'src/app/store/selector/player.selector';
import { StoreIndexModule } from 'src/app/store/store.module';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

  currentSong: Song | undefined;
  playList: Song[];
  songList: Song[];

  @ViewChild('audio', { static: true }) private audio: ElementRef;
  constructor(
    private store$: Store<StoreIndexModule>
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    //appStore$.pipe(select(getSongList)).subscribe(list => this.watchList(list, 'songList'))
    appStore$.pipe(select(getPlayList)).subscribe(list => this.watchList(list, 'playList'))
    appStore$.pipe(select(getCurrentSong)).subscribe(song => this.watchCurrentSong(song))
  }

  ngOnInit(): void {
  }

  watchCurrentSong(song: Song) {
    this.currentSong = song;
  }

  private watchList(list: Song[], type: 'playList' | 'songList') {

    this[type] = list;
    this.currentSong = list[0];
    if (list[0]) {
      console.log(list[0].url)
      //this.audio?.nativeElement.play();

    }
  }
}
