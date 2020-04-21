import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-memner-card',
  templateUrl: './memner-card.component.html',
  styleUrls: ['./memner-card.component.less']
})
export class MemnerCardComponent implements OnInit {

  @Output() openMOdal = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

}
