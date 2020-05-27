import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scrollable-tab',
  templateUrl: './scrollable-tab.component.html',
  styleUrls: ['./scrollable-tab.component.less']
})
export class ScrollableTabComponent implements OnInit {
  title = 'ng-pdd';
  selectedIndex = -1;
  @Input() menus: TopMenu[] = [];

  handleSelection(index) {
    this.selectedIndex = index;
  }
  constructor() { }

  ngOnInit() {
  }

}
