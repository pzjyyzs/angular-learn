import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/services/data-types';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {

  currentSong: Song | undefined;
  playList: Song[];
  constructor() { }

  ngOnInit(): void {
  }

}
