import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/internal/operators';
import { SingerDetail, Song, Singer } from 'src/app/service/data-types/common.types';
import { SongService } from 'src/app/service/song.service';
import { AppStoreModule } from 'src/app/store';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { Store, select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { getPlayer, getCurrentSong } from 'src/app/selectors/player.selectors';
import { findIndex } from 'src/utils/array';
import { Subject } from 'rxjs';
import { SetShareInfo } from 'src/app/actions/member.action';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.less']
})
export class SingerDetailComponent implements OnInit, OnDestroy {

  singerDetail: SingerDetail;
  simiSingers: Singer[];
  currentSong: Song;
  currentIndex = -1;
  hasLiked = false;
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private songServe: SongService,
    private store$: Store<AppStoreModule>,
    private bachActionServe: BatchActionsService,
    private nzMessageServe: NzMessageService,
    private memberServe: MemberService) {
    this.route.data.pipe(map(res => res.SingerDetail)).subscribe(([detail, simiSingers]) => {
      this.singerDetail = detail;
      this.simiSingers = simiSingers;
      this.listenCurrent();
    });
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
            this.nzMessageServe.create('warning', 'NO URL');
          }
        });
    }
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
    this.bachActionServe.likeSong(id);
  }

  onLikeSongs(songs: Song[]) {
    const ids = songs.map(item => item.id).join(',');
    this.onLikeSong(ids);
  }

  onLikeSinger(id: string) {
    let typeInfo = {
      type: 1,
      msg: '收藏'
    }
    if (this.hasLiked) {
      typeInfo = {
        type: 2,
        msg: '取消收藏'
      }
    }
    this.memberServe.likeSinger(id, typeInfo.type).subscribe(() => {
      this.hasLiked = !this.hasLiked;
      this.nzMessageServe.create('success', typeInfo.msg + '成功');
    }, error => {
      this.nzMessageServe.create('error', error.msg || typeInfo.msg + '失败');
    });
  }
}
