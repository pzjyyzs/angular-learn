import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { Song, Singer } from 'src/app/service/data-types/common.types';
import { getSongList, getPlayList, getCurrentIndex, getPlayMode, getCurrentSong, getPlayer, getCurrentAction } from 'src/app/selectors/player.selectors';
import { PlayMode } from './player-type';
import { SetCurrentIndex, SetPlayMode, SetPlayList, SetCurrentAction } from 'src/app/actions/player.action';
import { Subscription, timer } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { shuffle, findIndex } from 'src/utils/array';
import { WiPlayerPanelComponent } from './wi-player-panel/wi-player-panel.component';
import { NzModalService } from 'ng-zorro-antd';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { Router } from '@angular/router';
import { transition, animate, trigger, style, state, AnimationEvent } from '@angular/animations';
import { CurrentActions } from 'src/app/reducers/player.reducer';
import { SetShareInfo } from 'src/app/actions/member.action';

const modeTypes: PlayMode[] = [{
  type: 'loop',
  label: '循环'
}, {
  type: 'random',
  label: '随机'
}, {
  type: 'singleLoop',
  label: '单曲循环'
}]

enum TipTitles {
  Add = '已添加到列表',
  Play = '已开始播放'
}
@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less'],
  animations: [trigger('showHide', [
    state('show', style({ bottom: 0 })),
    state('hide', style({ bottom: -71 })),
    transition('show<=>hide', [animate('0.3s')])
  ])]
})
export class WyPlayerComponent implements OnInit {
  showPlayer = 'hide';
  isLocked = false;
  animating = false;

  controlTooltip = {
    title: '',
    show: false
  }

  bufferPercent = 0;
  percent = 0;

  songList: Song[];
  playList: Song[];
  currentIndex: number;
  currentSong: Song;
  @ViewChild('audio', { static: true }) private audio: ElementRef;
  @ViewChild(WiPlayerPanelComponent, { static: false }) private playerPanel: WiPlayerPanelComponent;
  private audioEl: HTMLAudioElement;

  duration: number;
  currentTime: number;

  playing = false;
  songReady = false;

  volume = 60;

  showVolumnPanel = false;

  showPanel = false;

  // 是否点击音量面板
  bindFlag = false;

  private winClick: Subscription;
  currentMode: PlayMode;
  modeCount = 0;

  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc: Document,
    private nzModalServe: NzModalService,
    private batchActionsServe: BatchActionsService,
    private router: Router
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => this.watchList(list, 'songList'));
    appStore$.pipe(select(getPlayList)).subscribe(list => this.watchList(list, 'playList'));
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => this.watchCurrentIndex(index));
    appStore$.pipe(select(getPlayMode)).subscribe(mode => this.watchPlayMode(mode));
    appStore$.pipe(select(getCurrentSong)).subscribe(song => this.watchCurrentSong(song));
    appStore$.pipe(select(getCurrentAction)).subscribe(action => this.watchCurrentAction(action));
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
    this.currentMode = mode;
    if (this.songList) {
      let list = this.songList.slice();
      if (mode.type === 'random') {
        list = shuffle(this.songList);
      }
      this.updateCurrentIndex(list, this.currentSong);
      this.store$.dispatch(SetPlayList({ playList: list }));
    }
  }
  private watchCurrentSong(song: Song) {
    this.currentSong = song;
    if (song) {
      this.duration = song.dt / 1000;
    }
  }
  private watchCurrentAction(action: CurrentActions) {
    const title = TipTitles[CurrentActions[action]];
    if (title) {
      this.controlTooltip.title = title;
      if (this.showPlayer === 'hide') {
        this.togglePlayer('show');
      } else {
        this.showToolTip();
      }
    }
    this.store$.dispatch(SetCurrentAction({ currentAction: CurrentActions.Other }));
  }

  onPercentChange(per) {
    if (this.currentSong) {
      const currentTime = this.duration * (per / 100);
      this.audioEl.currentTime = currentTime;
      if (this.playerPanel) {
        this.playerPanel.seekLyric(currentTime * 1000);
      }
    }
  }

  private showToolTip() {
    this.controlTooltip.show = true;
    timer(1500).subscribe(() => {
      this.controlTooltip = {
        title: '',
        show: false
      }
    })
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
    if (buffered.length && this.bufferPercent < 100) {
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
    if (this.playerPanel) {
      this.playerPanel.seekLyric(0);
    }
  }

  onVolumeChange(per: number) {
    this.audioEl.volume = per / 100;
  }

  toggleVolPanel() {
    this.togglePanel('showVolumnPanel');
  }

  toggleListPanel() {
    if (this.songList.length) {
      this.togglePanel('showPanel');
    }
  }
  togglePanel(type: string) {
    this[type] = !this[type];
    this.bindFlag = (this.showVolumnPanel || this.showPanel);
  }


  changeMode() {
    this.store$.dispatch(SetPlayMode({ playMode: modeTypes[++this.modeCount % 3] }));
  }

  private updateCurrentIndex(list: Song[], song: Song) {
    const newIndex = findIndex(list, song);
    this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }));
  }

  onEnded() {
    if (this.currentMode.type === 'singleLoop') {
      this.loop();
    } else {
      this.onNext(this.currentIndex + 1);
    }
  }

  onChangeSong(song: Song) {
    this.updateCurrentIndex(this.playList, song);
  }

  onDeleteSong(song: Song) {
    this.batchActionsServe.deleteSong(song);
  }

  onClearSong() {
    this.nzModalServe.confirm({
      nzTitle: '确认清空列表',
      nzOnOk: () => {
        this.batchActionsServe.clearSong();
      }
    });

  }

  onClickOutSide(target: HTMLElement) {
    if (target.dataset.act !== 'delete') {
      this.showVolumnPanel = false;
      this.showPanel = false;
      this.bindFlag = false;
    }
  }

  toInfo(path: [string, number]) {
    if (path[1]) {
      this.showPanel = false;
      this.showVolumnPanel = false;
      this.router.navigate(path);
    }
  }

  togglePlayer(type: string) {
    if (!this.isLocked && !this.animating) {
      this.showPlayer = type;
    }
  }

  OnAnimateDone(event: AnimationEvent) {
    this.animating = false;
    if (event.toState === 'show' && this.controlTooltip.title) {
      this.showToolTip();
    }
  }

  onError() {
    this.playing = false;
    this.bufferPercent = 0;
  }

  onShareSong(resource: Song, type = 'song') {
    const txt = this.makeTxt('歌曲', resource.name, (resource as Song).ar);
    this.store$.dispatch(SetShareInfo({info: { id: resource.id.toString(), type, txt }}));
  }

  private makeTxt(type: string, name: string, makeBy: Singer[]): string {
    const makeByStr = makeBy.map(item => item.name).join('/');

    return `${type}: ${name} -- ${makeByStr}`;
  }
  onLikeSong(id: string) {
    this.batchActionsServe.likeSong(id);
  }
}
