import { SongSheet } from './../../../services/data-types';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sing-sheet',
  templateUrl: './sing-sheet.component.html',
  styleUrls: ['./sing-sheet.component.scss']
})
export class SingSheetComponent implements OnInit {

  @Input() song!: SongSheet;
  @Output() playSheet = new EventEmitter<number>;
  constructor() { }

  ngOnInit(): void {
  }

  onPlayList(event: MouseEvent) {
    event.stopPropagation();
    console.log('song id', this.song.id)
    this.playSheet.emit(this.song.id);
  }


}
