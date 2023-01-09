import { Subscription } from 'rxjs';
import { Singer, SongSheet, Dj, Song } from './../../../services/data-types';
import { combineLatest, interval, Observable, of, switchMap, take, timer } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner } from 'src/app/services/data-types';
import { HomeService } from 'src/app/services/home.service';
import { WyCarouselComponent } from '../../../share/wy-ui/wy-carousel/wy-carousel.component';
import { SongService } from 'src/app/services/song.service';
import { BatchActionService } from 'src/app/store/batch-action.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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
  showLogin: boolean = false;

  @ViewChild('carousel') carousel!: WyCarouselComponent;

  get indexColor(): string {
    return this._indexColor;
  }

  set indexColor(color) {
    this._indexColor = `url(${color}?imageView&blur=40x20)`;
  }

  /* formModel: FormGroup;
  codeStr = '获取验证码';
  codeTime = 30;
  codeBtnDisable = false; */
  qrImg: string | undefined = '';
  isQrImgShow = false;
  loginStatus$: Subscription;
  constructor(
    private homeService: HomeService,
    private songService: SongService,
    private userService: UserService,
    private batchService: BatchActionService,
    private fb: FormBuilder,
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
        this.batchService.insertSong(list[0], true);
      } else {
        //this.a
      }
      console.log(list);
    })
  }

  openLoginModal() {
    this.showLogin = true;
    this.getQrCode();
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

  reloadQrCode() {
    this.isQrImgShow = false;
    this.getQrCode();
  }

  getQrCode() {
    let key: string;
    const cookie = localStorage.getItem('cookie');
    // this.getLoginStatus(cookie);
    console.log('a')
    this.userService.getQrCode().pipe(
      switchMap((data: { code: number, unikey: string }) => {
        if (data.code === 200) {
          key = data.unikey;
          return this.userService.getQrCodeImg({ key, qrimg: true, timerstamp: Date.now() })
        }
        return of(null)
      })
    ).subscribe(res => {
      this.qrImg = res?.qrimg;
      this.loginStatus$ = interval(3000).pipe(
        switchMap(() => {
          return this.userService.getQrStatus({ key, timerstamp: Date.now() })
        })
      ).subscribe(async (data) => {
        console.log('data', data)
        if (data.code === 800) {
          this.isQrImgShow = true;
        }
        if (data.code === 803) {
          this.loginStatus$.unsubscribe();
          this.userService.getLoginStatus(data.cookie).subscribe(item => {
            console.log('item', item)
            localStorage.setItem('cookie', data.cookie);
            this.showLogin = false;
          })
        }
      })
    })

  }
}
