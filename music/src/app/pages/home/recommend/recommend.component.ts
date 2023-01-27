import { SetPlayList, SetSongList } from './../../../store/actions/play.action';
import { getUserInfo } from './../../../store/selector/user.selector';
import { Subscription } from 'rxjs';
import { Singer, SongSheet, Dj, Song, User } from './../../../services/data-types';
import { combineLatest, interval, Observable, of, switchMap, take, timer } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner } from 'src/app/services/data-types';
import { HomeService } from 'src/app/services/home.service';
import { WyCarouselComponent } from '../../../share/wy-ui/wy-carousel/wy-carousel.component';
import { SongService } from 'src/app/services/song.service';
import { BatchActionService } from 'src/app/store/batch-action.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { StoreIndexModule } from 'src/app/store/store.module';
import { select, Store } from '@ngrx/store';
import { getUser } from 'src/app/store/selector/user.selector';
import { Router } from '@angular/router';
import { SetOpenLoginModal } from 'src/app/store/actions/user.action';

type Playlist = {
  coverImgUrl: string,
  name: string,
  tracks: Song[]
}

type Toplist = {
  playlist: Playlist
}
@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.less']
})
export class RecommendComponent implements OnInit {
  banner: Banner[] = [];
  songSheet: SongSheet[] = [];
  albums?: any[] = []
  toplist?: Toplist;
  newList?: Toplist;
  hotList?: Toplist;
  _indexColor: string = "";
  isHoving: string = '';
  singerList: Singer[];
  djList: Dj[];

  @ViewChild('carousel') carousel!: WyCarouselComponent;

  get indexColor(): string {
    return this._indexColor;
  }

  set indexColor(color) {
    this._indexColor = `url(${color}?imageView&blur=40x20)`;
  }

  qrImg: string | undefined = '';
  user: User;
  constructor(
    private homeService: HomeService,
    private songService: SongService,
    private userService: UserService,
    private batchService: BatchActionService,
    private fb: FormBuilder,
    private store$: Store<StoreIndexModule>,
    private router: Router,
  ) {
    combineLatest([this.homeService.getBanners(), this.homeService.getTopPlaylist(), this.homeService.getTopAlbum(),
    this.songService.getSheet(19723756), this.songService.getSheet(3779629), this.songService.getSheet(3778678),
    this.songService.getIndexSongList(), this.songService.getTopListDj(),
    ]).subscribe(data => {
      console.log('123', data)
      this.banner = data[0];
      if (this.banner.length > 0) {
        this.indexColor = this.banner[0].imageUrl;
      }

      this.songSheet = data[1];
      this.albums = this.sliceAlbums(data[2]?.albums);

      this.toplist = data[3];
      this.newList = data[4];
      this.hotList = data[5];
      this.singerList = data[6];
      this.djList = data[7];
    });

    const appStore$ = this.store$.pipe(select(getUser));
    appStore$.pipe(select(getUserInfo)).subscribe(info => {
      this.user = info;
    })
    /* this.formModel = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      code: ['', [Validators.required, Validators.minLength(6)]]
    }); */
  }

  ngOnInit(): void {
  }

  beforeChange(item: { from: number, to: number }): void {
    this.indexColor = this.banner[item.to].imageUrl;
  }

  changeImage(value: string): void {
    if (value === 'prev') {
      this.carousel.pre();
    } else {
      this.carousel.next();
    }
  }

  sliceAlbums(arr: any[]) {
    let total = [];
    let index = 2;
    while (index--) {
      total.push(arr.splice(0, 5));
    }
    return total;
  }

  addClass(index: number, item: any, cate: 'hot' | 'new' | 'top'): void {
    this.isHoving = index + item.name + cate;
  }

  removeClass(): void {
    this.isHoving = '';
  }

  onPlay(item: Song, isPlay: boolean = false) {
    this.songService.getSongList(item).subscribe(list => {
      if (list.length) {
        this.batchService.insertSong(list[0], isPlay);
      }
    })
  }

  onPlayList(list: Song[] | undefined) {
    if (list) {
      this.songService.getSongList(list).subscribe(list => {
        this.batchService.insertSongList(list.slice(0, 90), true);
      })
    }
  }
  openLoginModal() {
    /* this.showLogin = true;
    this.getQrCode(); */
    this.store$.dispatch(SetOpenLoginModal({ openLoginModal: true }));
  }

  onSubmit() {
    /*  if (!this.formModel.valid) {
       let arg = {
         phone: this.formModel.value['phone'],
         captcha: this.formModel.value['code'],
         realIP: '116.25.146.177'
       }
       this.userService.login(arg).subscribe({
         next: user => {
           console.log('user', user);
         },
         error: error => {
           console.log('recommend error', error);
         }
       });
     }
     console.log('code', this.formModel) */
  }

  getLoginCode() {
    /*  console.log('error',)
     let phone = this.formModel.controls['phone'];
     if (!phone?.errors) {
       this.userService.sendCode(phone.value).subscribe(code => {
         if (code === 200) {

           interval(1000).pipe(take(this.codeTime + 1)).subscribe({
             next: (x) => {
               this.codeStr = `${this.codeTime - x}`;
               this.codeBtnDisable = true;
             },
             error: () => { },
             complete: () => {
               this.codeStr = '获取验证码';
               this.codeBtnDisable = false;
             }
           })
         }
       })

     } */

  }

  toInfo(id: number) {
    this.router.navigate(['/home/sheetinfo', id]);
  }

  playSheet(id: number) {
    this.songService.getSheetSong(id).subscribe(songs => {
      this.store$.dispatch(SetPlayList({ playList: songs }));
      this.store$.dispatch(SetSongList({ songList: songs }));
      localStorage.setItem('songlist', JSON.stringify(songs));
    })
  }
}
