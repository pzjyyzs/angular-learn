import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/internal/operators';
import { SingerDetail, Song } from 'src/app/service/data-types/common.types';
import { SongService } from 'src/app/service/song.service';
import { AppStoreModule } from 'src/app/store';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { Store, select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { getPlayer, getCurrentSong } from 'src/app/selectors/player.selectors';
import { findIndex } from 'src/utils/array';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.less']
})
export class SingerDetailComponent implements OnInit, OnDestroy {

  singerDetail: SingerDetail;
  currentSong: Song;
  currentIndex = -1;
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private songServe: SongService,
    private store$: Store<AppStoreModule>,
    private bachActionServe: BatchActionsService,
    private nzMessageServe: NzMessageService) {
    this.route.data.pipe(map(res => res.SingerDetail)).subscribe(detail => {
      this.singerDetail = detail;
      this.listenCurrent();
    })
   }

  ngOnInit() {
  }

  onAddSongs(songs: Song[], isPlay = false) {
    this.songServe.getSongList(songs).subscribe(list => {
      if (list.length) {
        if (isPlay) {
          this.bachActionServe.selectPlayList({ list, index: 0 });
        } else {
          this.bachActionServe.insertSongs(list);
        }
      }
    });
  }

  private listenCurrent() {
    this.store$
      .pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$))
      .subscribe(song => {
        this.currentSong = song;
        if (song) {
          this.currentIndex = findIndex(this.singerDetail.hotSongs, song);
        } else {
          this.currentIndex = -1;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
}
