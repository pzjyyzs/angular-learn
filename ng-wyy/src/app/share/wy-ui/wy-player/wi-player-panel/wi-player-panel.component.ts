import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/service/data-types/common.types';

@Component({
  selector: 'app-wi-player-panel',
  templateUrl: './wi-player-panel.component.html',
  styleUrls: ['./wi-player-panel.component.less']
})
export class WiPlayerPanelComponent implements OnInit, OnChanges {

  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() currentIndex: number;
  @Input() show: boolean;

  @Output() onClose = new EventEmitter<void>();
  @Output() onChangeSong = new EventEmitter<Song>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songList']) {

    }
    if (changes['currentSong']) {

    }
  }
}
