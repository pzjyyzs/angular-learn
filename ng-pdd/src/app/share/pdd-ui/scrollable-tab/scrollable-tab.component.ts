import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TopMenu } from 'src/app/services/data-types/common';


@Component({
  selector: 'app-scrollable-tab',
  templateUrl: './scrollable-tab.component.html',
  styleUrls: ['./scrollable-tab.component.less']
})
export class ScrollableTabComponent implements OnInit {
  title = 'ng-pdd';
  @Input() selectedTabLink: string;
  @Input() menus: TopMenu[] = [];
  @Input() backgroundColor = '#fff';
  @Input() titleActiveColor = 'yellow';
  @Input() titleColor = 'blue';
  @Input() indicatorColor = 'brown';
  @Output() tabSelected = new EventEmitter();

  handleSelection(index) {
    this.tabSelected.emit(this.menus[index]);
  }
  constructor() { }

  ngOnInit() {
  }

}
