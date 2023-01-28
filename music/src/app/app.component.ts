import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { SetOpenLoginModal, SetUser } from './store/actions/user.action';
import { StoreIndexModule } from './store/store.module';
import { select, Store } from '@ngrx/store';
import { User } from './services/data-types';
import { SetSongList, SetPlaying, SetPlayList, SetCurrentIndex } from './store/actions/play.action';
import { interval, of, Subscription, switchMap } from 'rxjs';
import { getOpenLoginModal, getUser } from './store/selector/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  user: User;
  showLogin: boolean = false;
  qrImg: string | undefined = '';
  isQrImgShow = false;
  loginStatus$: Subscription;
  constructor(private userService: UserService, private store$: Store<StoreIndexModule>) {
    const appStore$ = this.store$.pipe(select(getUser));
    appStore$.pipe(select(getOpenLoginModal)).subscribe(isOpenLogin => {
      this.showLogin = isOpenLogin;
      if (this.showLogin) {
        this.reloadQrCode()
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const cookie = localStorage.getItem('cookie');
    this.userService.getLoginStatus(cookie).subscribe(data => {
      if (data.code === 200) {
        this.store$.dispatch(SetUser({ user: data.profile }));
        this.user = data.profile;
      }
    });
    this.setStorageList();
  }

  setStorageList() {
    let listString = localStorage.getItem('songlist');
    if (listString) {
      let list = JSON.parse(listString);

      this.store$.dispatch(SetSongList({ songList: list }));
      this.store$.dispatch(SetPlayList({ playList: list }));
      //this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));

    }
  }

  reloadQrCode() {
    this.isQrImgShow = false;
    this.getQrCode();
  }

  getQrCode() {
    let key: string;
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
        if (data.code === 800) {
          this.isQrImgShow = true;
        }
        if (data.code === 803) {
          this.loginStatus$.unsubscribe();
          this.userService.getLoginStatus(data.cookie).subscribe(item => {
            localStorage.setItem('cookie', data.cookie);
            this.store$.dispatch(SetOpenLoginModal({ openLoginModal: false }));
            if (item.code === 200) {
              this.store$.dispatch(SetUser({ user: item.profile }));
              this.user = item.profile;
            }
          })
        }
      })
    })

  }

  changeLoginModal() {
    this.store$.dispatch(SetOpenLoginModal({ openLoginModal: false }));
  }
}
