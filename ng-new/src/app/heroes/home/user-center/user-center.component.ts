import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../add-hero/types';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCenterComponent implements OnInit {

  user: Hero;
  constructor(private userServe: UserService) {
    this.userServe.user$.subscribe(user => {
      this.user = user;
    });
   }

  ngOnInit(): void {
  }

}
