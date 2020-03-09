import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { Song } from 'src/app/service/data-types/common.types';
import { getSongList, getPlayList, getCurrentIndex, getPlayMode, getCurrentSong, getPlayer } from 'src/app/selectors/player.selectors';
import { PlayMode } from './player-type';
import { SetCurrentIndex } from 'src/app/actions/player.action';
import { Subscription, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {

  bufferPercent = 0;
  percent = 0;

  songList: Song[];
  playList: Song[];
  currentIndex: number;
  currentSong: Song;
  @ViewChild('audio', { static: true }) private audio: ElementRef;
  private audioEl: HTMLAudioElement;

  duration: number;
  currentTime: number;

  playing = false;
  songReady = false;

  volume = 60;

  showVolumnPanel = false;

  // 是否点击音量面板
  selfClick = false;

  private winClick: Subscription;
  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc: Document
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
    if (song) {
      this.currentSong = song;
      this.duration = song.dt / 1000;
    }
  }

  onPercentChange(per) {
    if (this.currentSong) {
      this.audioEl.currentTime = this.duration * (per / 100);
    }
  }
  onCanplay() {
    this.songReady = true;
    this.play();
  }
  private play() {
    this.audioEl.play();
    this.playing = true;
  }

  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl : '//s4.music.126.net/style/web2/img/default/default_album.jpg'
  }

  onTimeUpdate(e: Event) {
    this.currentTime = (e.target as HTMLAudioElement).currentTime;
    this.percent = (this.currentTime / this.duration) * 100;
    const buffered = this.audioEl.buffered;
    if (buffered && this.bufferPercent < 100) {
      this.bufferPercent = (buffered.end(0) / this.duration) * 100;
    }
  }

  onToggle() {
    if (!this.currentSong) {
      if (this.playList.length) {
        this.updateIndex(0);
      }
    } else {
      if (this.songReady) {
        this.playing = !this.playing;
        if (this.playing) {
          this.audioEl.play();
        } else {
          this.audioEl.pause();
        }
      }
    }

  }

  onPrey(index: number) {
    if (!this.songReady) { return; }
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index <= 0 ? this.playList.length - 1 : index;
      this.updateIndex(newIndex);
    }
  }
  onNext(index: number) {
    if (!this.songReady) { return; }
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index >= this.playList.length ? 0 : index;
      this.updateIndex(newIndex);
    }

  }

  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.songReady = false;
  }

  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
  }

  onVolumeChange(per: number) {
    this.audioEl.volume = per / 100;
  }

  toggleVolPanel(evt: MouseEvent) {
    //evt.stopPropagation();
    this.togglePanel();
  }

  togglePanel() {
    this.showVolumnPanel = !this.showVolumnPanel;
    if (this.showVolumnPanel) {
      this.bindDocumentClickListener();
    } else {
      this.unbindDocumentClickListener();
    }
  }

  private bindDocumentClickListener() {
    if (!this.winClick) {
      this.winClick = fromEvent(this.doc, 'click').subscribe(() => {
          if (!this.selfClick) {
            this.showVolumnPanel = false;
            this.unbindDocumentClickListener();
          }
          this.selfClick = false;
      });
    }
  }
  private unbindDocumentClickListener() {
    if (this.winClick) {
      this.winClick.unsubscribe();
      this.winClick = null;
    }
  }
}
