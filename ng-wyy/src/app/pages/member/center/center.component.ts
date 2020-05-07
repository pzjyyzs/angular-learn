import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/internal/operators';
import { User, recordVal, UserSheet } from 'src/app/service/data-types/member.types';
import { SheetService } from 'src/app/service/sheet.service';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { RecordType, MemberService } from 'src/app/service/member.service';
import { MemberState } from 'src/app/reducers/member.reducer';
import { SongService } from 'src/app/service/song.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Song, Singer } from 'src/app/service/data-types/common.types';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { getCurrentSong, getPlayer } from 'src/app/selectors/player.selectors';
import { findIndex } from 'src/utils/array';
import { Subject } from 'rxjs';
import { SetShareInfo } from 'src/app/actions/member.action';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CenterComponent implements OnInit, OnDestroy {

  user: User;
  records: recordVal[];
  userSheet: UserSheet;
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
    this.route.data.pipe(map(res => res.user)).subscribe(([user, userRecord, userSheet]) => {
      this.user = user;
      this.records = userRecord.slice(0, 10);
      this.userSheet = userSheet;
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
        this.records = records.slice(0, 10);
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
