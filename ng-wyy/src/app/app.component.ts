import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { SearchResult } from './service/data-types/common.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng-wyy';
  menu = [{
    label: '发现',
    path: '/home'
  }, {
    label: '歌单',
    path: '/sheet'
  }];


  searchResult: SearchResult;
  constructor(private searchServe: SearchService) {

  }
  onSearch(keyword: string) {
    if (keyword) {
      this.searchServe.search(keyword).subscribe(res => {
        this.searchResult = res;
      })
    } else {
      this.searchResult = {};
    }
  }
}
