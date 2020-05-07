import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/internal/operators';
import { User, recordVal, UserSheet } from 'src/app/service/data-types/member.types';
import { RecordType, MemberService } from 'src/app/service/member.service';
import { Song, Singer } from 'src/app/service/data-types/common.types';
import { Subject } from 'rxjs';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { SongService } from 'src/app/service/song.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { getCurrentSong, getPlayer } from 'src/app/selectors/player.selectors';
import { findIndex } from 'src/utils/array';
import { SheetService } from 'src/app/service/sheet.service';
import { SetShareInfo } from 'src/app/actions/member.action';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styles: [`.record-detail .page-wrap { padding: 40px; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordDetailComponent implements OnInit, OnDestroy {
  user: User;
  records: recordVal[];
  recordType = RecordType.weekData;
  private currentSong: Song;
  currentIndex = -1;
  private destory$ = new Subject();
  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private batchActionsServe: BatchActionsService,
    private memberServe: MemberService,
    private songServe: SongService,
    private bachActionServe: BatchActionsService,
    private nzMessageServe: NzMessageService,
    private store$: Store<AppStoreModule>,
    private cdr: ChangeDetectorRef
  ) {
    this.route.data.pipe(map(res => res.user)).subscribe(([user, userRecord]) => {
      this.user = user;
      this.records = userRecord;
      this.cdr.markForCheck();
      this.listenCurrentSong();
    });
   }


  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit() {
  }

  private listenCurrentSong() {
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getCurrentSong), takeUntil(this.destory$)).subscribe(song => {
      this.currentSong = song;
      if (song) {
        const songs = this.records.map(item => item.song);
        this.currentIndex = findIndex(songs, song);
      } else {
        this.currentIndex = -1;
      }
      this.cdr.markForCheck();
    });
  }

  onPlaySheet(id: number) {
    this.sheetService.playSheet(id).subscribe(list => {
      this.batchActionsServe.selectPlayList({ list, index: 0});
    });
  }

  onChangeType(type: RecordType) {
    if (this.recordType !== type) {
      this.recordType = type;
      this.memberServe.getUserRecord(this.user.profile.userId.toString(), type)
      .subscribe(records => {
        this.records = records;
        this.cdr.markForCheck();
      });
    }
  }

  onAddSong([song, play]) {
    if (!this.currentSong || this.currentSong.id !== song.id) {
      this.songServe.getSongList(song)
      .subscribe(list => {
        if (list.length) {
          this.bachActionServe.insertSong(list[0], play);
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
    this.batchActionsServe.likeSong(id);
  }
}
