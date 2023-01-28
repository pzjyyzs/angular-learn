import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, mergeMap, Subject } from 'rxjs';
import { User, Song, Comment, CommentType } from 'src/app/services/data-types';
import { SongService } from 'src/app/services/song.service';
import { UserService } from 'src/app/services/user.service';
import { SetOpenLoginModal } from 'src/app/store/actions/user.action';
import { BatchActionService } from 'src/app/store/batch-action.service';
import { getCurrentSong, getPlayer } from 'src/app/store/selector/player.selector';
import { getUser, getUserInfo } from 'src/app/store/selector/user.selector';
import { StoreIndexModule } from 'src/app/store/store.module';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit {

  playList: any;
  user: User;
  description: { short: string, long: string } = { short: '', long: '' };
  controlDesc = {
    isExpand: false,
    label: '展开',
    iconCls: 'down'
  };
  sheetUser: any
  currentSong: Song | undefined;
  offset: number = 1;
  commentList: Array<Comment>;
  commentTotal: number;
  commentPageCount: number = 20;
  playListId: string | null = '';
  constructor(private route: ActivatedRoute, private songService: SongService, private userService: UserService,
    private store$: Store<StoreIndexModule>, private batchService: BatchActionService) { }

  ngOnInit(): void {
    this.playListId = this.route.snapshot.paramMap.get('id');
    if (this.playListId) {
      this.songService.getSheet(parseInt(this.playListId))
        .pipe(
          mergeMap(data => {
            this.playList = data.playlist;
            console.log('playlist', data)
            if (this.playList.description) {
              this.changeDesc(this.playList.description)
            }
            return forkJoin([this.userService.getUser({ uid: data.playlist.userId }), this.songService.getComment(this.playListId!, this.offset, this.commentPageCount)])
          })
        ).subscribe(data => {
          this.sheetUser = data[0];
          this.commentList = data[1].comments;
          this.commentTotal = data[1].total;
        })
    }

    const appStore$ = this.store$.pipe(select(getUser));
    const songStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getUserInfo)).subscribe(info => {
      this.user = info;
    });
    songStore$.pipe(select(getCurrentSong)).subscribe(song => this.currentSong = song);
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

  onPlaySong(song: Song, isPlay: boolean) {
    this.batchService.insertSong(song, isPlay);
  }

  playSheet(isPlay: boolean) {
    this.songService.getSongList(this.playList.tracks).subscribe(list => {
      this.batchService.insertSongList(list.slice(0, 90), isPlay);
    })

  }

  changeIndex(index: number) {
    this.songService.getComment(this.playListId!, index * this.commentPageCount, this.commentPageCount).subscribe(data => {
      this.commentList = data.comments;
      this.offset = index;
    })
  }

  changeLike(args: { cid: number, isLike: boolean }) {
    if (this.user) {
      this.songService.setCommentLike({ id: this.playListId!, cid: args.cid, t: Number(!args.isLike), type: CommentType.Sheet }).subscribe(data => {
        console.log('like', data)
      })
    } else {
      this.store$.dispatch(SetOpenLoginModal({ openLoginModal: true }));
    }
  }

  private changeDesc(desc: string) {
    if (desc.length < 99) {
      this.description = {
        short: this.replaceBr('<b>介绍：</b>' + desc),
        long: ''
      };
    } else {
      this.description = {
        short: this.replaceBr('<b>介绍：</b>' + desc.slice(0, 99)) + '...',
        long: this.replaceBr('<b>介绍：</b>' + desc)
      };
    }
  }

  private replaceBr(str: string): string {
    return str.replace(/\n/g, '<br />');
  }
}
