import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Song } from 'src/app/services/data-types';
import { StoreIndexModule } from 'src/app/store/store.module';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

  currentSong: Song | undefined;
  playList: Song[];
  constructor(
    private store$: Store<StoreIndexModule>
  ) { }

  ngOnInit(): void {
  }

}
