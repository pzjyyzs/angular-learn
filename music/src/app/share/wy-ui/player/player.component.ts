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
  private audioEl: HTMLAudioElement;
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
    this.audioEl = this.audio.nativeElement;
    this.audioEl.volume = 0.3;
  }

  watchCurrentSong(song: Song) {
    this.currentSong = song;
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
    this.currentSong = list[list.length - 1];
    if (this.currentSong) {
     this.playUrl = `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
     this.duration = this.currentSong.dt / 1000;
    }
  }

  private play() {
    this.audioEl.play();
    this.playing = true;
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
}
