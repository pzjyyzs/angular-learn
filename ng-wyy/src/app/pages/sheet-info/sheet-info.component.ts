import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/internal/operators';
import { SongSheet, Song, Singer } from 'src/app/service/data-types/common.types';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { getCurrentSong, getPlayer } from 'src/app/selectors/player.selectors';
import { SongService } from 'src/app/service/song.service';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { NzMessageService } from 'ng-zorro-antd';
import { findIndex } from 'src/utils/array';
import { ModalTypes } from 'src/app/reducers/member.reducer';
import { MemberService } from 'src/app/service/member.service';
import { SetShareInfo } from 'src/app/actions/member.action';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit, OnDestroy {
  sheetInfo: SongSheet;

  description = {
    short: '',
    long: ''
  }

  controlDesc = {
    isExpand: false,
    label: '展开',
    iconCls: 'down'
  };

  currentSong: Song;
  currentIndex = -1;
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>,
    private songServe: SongService,
    private bachActionServe: BatchActionsService,
    private messageServe: NzMessageService,
    private memberService: MemberService
  ) {
    this.route.data.pipe(map(res => res.sheetInfo)).subscribe(res => {
      this.sheetInfo = res;
      if (res.description) {
        this.changeDesc(res.description)
      }
      this.listenCurrent();
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
  }

  private listenCurrent() {
    this.store$
      .pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$))
      .subscribe(song => {
        this.currentSong = song;
        if (song) {
          this.currentIndex = findIndex(this.sheetInfo.tracks, song);
        } else {
          this.currentIndex = -1;
        }
      });
  }
  toggleDesc() {
    this.controlDesc.isExpand = !this.controlDesc.isExpand;
    if (this.controlDesc.isExpand) {
      this.controlDesc.label = '收起';
      this.controlDesc.iconCls = 'up';
    } else {
      this.controlDesc.label = '展开';
      this.controlDesc.iconCls = 'down';
    }
  }

  private changeDesc(desc: string) {
    if (desc.length < 99) {
      this.description = {
        short: this.replaceBr('<b>介绍: </b>' + desc),
        long: ''
      };
    } else {

      this.description = {
        short: this.replaceBr('<b>介绍: </b>' + desc.slice(0, 99)) + '...',
        long: this.replaceBr('<b>介绍: </b>' + desc)
      };
    }
  }

  private replaceBr(str: string) {
    return str.replace(/\n/g, '<br />');
  }

  onAddSong(song: Song, isPlay = false) {
    if (this.currentSong || this.currentSong.id !== song.id) {
      this.songServe.getSongList(song)
        .subscribe(list => {
          if (list.length) {
            this.bachActionServe.insertSong(list[0], isPlay);
          } else {
            this.alertMessage('warning', 'NO URL');
          }
        });
    }
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

  onLikeSheet(id: string) {
    this.memberService.likeSheet(id).subscribe(() => {
      this.alertMessage('success', '收藏成功');
    }, error => {
      this.alertMessage('error', error.msg || '收藏失败');
    });
  }

  shareResource(resource: Song | SongSheet, type = 'song') {
    let txt = '';
    if (type === 'playlist') {
      txt = this.makeTxt('歌单', resource.name, (resource as SongSheet).creator.nickname);
    } else {
      txt = this.makeTxt('歌曲', resource.name, (resource as Song).ar);
    }
    this.store$.dispatch(SetShareInfo({info: { id: resource.id.toString(), type, txt }}));
  }

  private makeTxt(type: string, name: string, makeBy: string | Singer[]): string {
    let makeByStr = '';
    if (Array.isArray(makeBy)) {
      makeByStr = makeBy.map(item => item.name).join('/');
    } else {
      makeByStr = makeBy;
    }
    return `${type}: ${name} -- ${makeByStr}`;
  }
  onLikeSong(id: string) {
    this.bachActionServe.likeSong(id);
  }

  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }
}
