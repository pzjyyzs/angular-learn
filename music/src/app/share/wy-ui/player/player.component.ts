import { getPlayMode, getCurrentIndex, getSongList } from './../../../store/selector/player.selector';
import { SetPlayMode, SetCurrentIndex } from './../../../store/actions/play.action';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PlayMode, Song } from 'src/app/services/data-types';
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
  songReady = false;
  // 播放状态
  playing = false;

  playUrl: string = '';
  progressBar: number = 0;
  duration: number = 0;
  currentTime: number = 0;
  percent: number = 0;
  bufferPercent: number = 0;
  volume: number = 60;
  isPercentChange: boolean = false;
  showVolumnPanel: boolean = false;
  showPanel: boolean = true;
  // 模式选择
  currentMode: PlayMode;
  modelTypes: PlayMode[] = [
    {
      type: 'loop',
      label: '循环',
    },
    {
      type: 'random',
      label: '循环'
    },
    {
      type: 'singleLoop',
      label: '单曲循环'
    }
  ]
  modeCount: number = 0;
  currentIndex: number;

  bindFlag: boolean = false;
  private audioEl: HTMLAudioElement;
  @ViewChild('audio', { static: true }) private audio: ElementRef;
  constructor(
    private store$: Store<StoreIndexModule>
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => this.watchList(list, 'songList'))
    appStore$.pipe(select(getPlayList)).subscribe(list => this.watchList(list, 'playList'));
    appStore$.pipe(select(getPlayMode)).subscribe(playMode => this.watchPlayMode(playMode));
    appStore$.pipe(select(getCurrentIndex)).subscribe(currentIndex => this.watchCurrentIndex(currentIndex));
    // 这个是 setCurrentIndex 触发的
    appStore$.pipe(select(getCurrentSong)).subscribe(song => this.watchCurrentSong(song));
  }

  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement;
  }

  private watchCurrentSong(song: Song) {
    if (song) {
      this.currentSong = song;
      this.playUrl = `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
      this.duration = this.currentSong.dt / 1000;
    }
  }

  onCanPlay() {
    this.songReady = true;
    this.play();
  }

  onToggle() {

    /* if (!this.currentSong) {

    } else { */
      if (this.songReady) {
        this.playing = !this.playing;
        if (this.playing) {
          this.audioEl.play();

        } else {
          this.audioEl.pause();
        }
      }
    // }
  }

  onTimeUpdate(e: Event) {
    this.currentTime = (e.target as HTMLAudioElement).currentTime;
    this.percent = (this.currentTime / this.duration) * 100;
  }

  private watchList(list: Song[], type: 'playList' | 'songList') {
    this[type] = list;
  }

  private play() {
    this.audioEl.play();
    this.playing = true;
  }

  private watchPlayMode(playMode: PlayMode) {
    this.currentMode = playMode;
  }

  private watchCurrentIndex(index: number) {
    console.log('current');
    this.currentIndex = index;
  }

  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl : '//s4.music.126.net/style/web2/img/default/default_album.jpg';
  }

  onLoadbar(){
    let duration = this.audioEl.duration;
    var bufferedEnd = this.audioEl.buffered.end(this.audioEl.buffered.length - 1);
    if (duration > 0) {
      this.progressBar = (bufferedEnd / duration)*100;
    }
  }

  onPercentChange(per: number | null) {
    if (this.currentSong && per) {
      const currentTime =  this.duration * ( per / 100);
      this.audioEl.currentTime = currentTime;
    }
  }

  onVolumeChange(per: number | null) {
    if (per) {
      this.volume = per;
    }
  }

  toggleVolPanel() {
    this.showVolumnPanel = !this.showVolumnPanel;
  }

  onEnded() {
    this.playing = false;
    if (this.currentMode.type === 'singleLoop') {

    } else {

    }
  }

  changeMode() {
    this.store$.dispatch(SetPlayMode({ playMode: this.modelTypes[++this.modeCount % 3]}))
  }

  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.songReady = false;
  }

  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
    // if ()
  }

  onPrev(index: number) {
    if (!this.songReady) { return; }
    if (this.playList.length === 1) {
      this.loop();
    } else {
      const newIndex = index < 0 ? this.playList.length - 1 : index;
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

  togglePanel() {
    this.showPanel = !this.showPanel;
    this.bindFlag = !this.showPanel;
  }

  onClickOutSide(target: HTMLElement) {
    if (target.dataset['act'] !== 'delete') {
      this.showPanel = true;
    }
  }
}
