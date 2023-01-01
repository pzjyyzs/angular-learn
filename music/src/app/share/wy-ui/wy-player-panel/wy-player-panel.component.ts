import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/services/data-types';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit {

  @Input() playing: boolean;
  @Input() songList: Song[];
  @Input() currentSong: Song | undefined;
  @Input() show: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
