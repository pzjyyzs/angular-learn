import { SongSheet } from './../../../services/data-types';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sing-sheet',
  templateUrl: './sing-sheet.component.html',
  styleUrls: ['./sing-sheet.component.scss']
})
export class SingSheetComponent implements OnInit {

  @Input() song!: SongSheet;
  constructor() { }

  ngOnInit(): void {
  }

}
