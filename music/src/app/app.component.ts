import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { SetUser } from './store/actions/user.action';
import { StoreIndexModule } from './store/store.module';
import { Store } from '@ngrx/store';
import { User } from './services/data-types';

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
    })
  }
}
