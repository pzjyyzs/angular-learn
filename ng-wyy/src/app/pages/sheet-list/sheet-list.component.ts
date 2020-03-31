import { Component, OnInit } from '@angular/core';
import { SheetParams, SheetService } from 'src/app/service/sheet.service';
import { ActivatedRoute } from '@angular/router';
import { SheetList } from 'src/app/service/data-types/common.types';
import { BatchActionsService } from 'src/app/store/batch-actions.service';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.less']
})
export class SheetListComponent implements OnInit {

  listParams: SheetParams = {
    cat: '全部',
    order: 'hot',
    offset: 1,
    limit: 35
  }
  sheets: SheetList;
  orderValue = 'hot';
  constructor(
    private route: ActivatedRoute,
    private sheetServe: SheetService,
    private batchActionsServe: BatchActionsService
  ) {
    this.listParams.cat = this.route.snapshot.queryParamMap.get('cat') || '全部';
    this.getList();
   }

  ngOnInit() {
  }

  private getList() {
    this.sheetServe.getSheets(this.listParams).subscribe(sheets => this.sheets = sheets);
  }

  onOrderChange(order: 'new' | 'hot') {
    this.listParams.order = order;
    this.listParams.offset = 1;
    this.getList();
  }

  onPlaySheet(id: number) {
    this.sheetServe.playSheet(id).subscribe(list => {
      this.batchActionsServe.selectPlayList({ list, index: 0});
    });
  }

  toInfo() {

  }

  onPageChange(page: number) {
    this.listParams.offset = page;
    this.getList();
  }
}
