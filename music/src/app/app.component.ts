import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { SetUser } from './store/actions/user.action';
import { StoreIndexModule } from './store/store.module';
import { Store } from '@ngrx/store';
import { User } from './services/data-types';
import { SetSongList, SetPlaying, SetPlayList, SetCurrentIndex } from './store/actions/play.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  user: User
  constructor(private userService: UserService, private store$: Store<StoreIndexModule>) {

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
}
