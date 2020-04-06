import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/internal/operators';
import { BaseLyricLine, WyLyric } from 'src/app/share/wy-ui/wy-player/wi-player-panel/wy-lyric';
import { Song } from 'src/app/service/data-types/common.types';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SongService } from 'src/app/service/song.service';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { getCurrentSong, getPlayer } from 'src/app/selectors/player.selectors';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.less']
})
export class SongInfoComponent implements OnInit, OnDestroy {

  song: Song;
  lyric: BaseLyricLine[];

  controlLyric = {
    isExpand: false,
    label: '展开',
    iconCls: 'down'
  };

  currentSong: Song;
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private songServe: SongService,
    private store$: Store<AppStoreModule>,
    private bachActionServe: BatchActionsService,
    private nzMessageServe: NzMessageService
  ) {
    this.route.data.pipe(map(res => res.songInfo)).subscribe(([song, lyric]) => {
      this.song = song;
      this.lyric = new WyLyric(lyric).lines;
      this.listenCurrent();
    });
  }

  ngOnInit() {
  }

  private listenCurrent() {
    this.store$
      .pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$))
      .subscribe(song => this.currentSong = song);
  }

  toggleLyric() {
    this.controlLyric.isExpand = !this.controlLyric.isExpand;
    if (this.controlLyric.isExpand) {
      this.controlLyric.label = '收起';
      this.controlLyric.iconCls = 'up';
    } else {
      this.controlLyric.label = '展开';
      this.controlLyric.iconCls = 'down';
    }
  }

  onAddSong(song: Song, isPlay = false) {
    if (this.currentSong || this.currentSong.id !== song.id) {
      this.songServe.getSongList(song)
        .subscribe(list => {
          if (list.length) {
            this.bachActionServe.insertSong(list[0], isPlay);
          } else {
            this.nzMessageServe.create('warning', 'NO URL')
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
