import { SetUser } from './../../store/actions/user.action';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { StoreIndexModule } from 'src/app/store/store.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
