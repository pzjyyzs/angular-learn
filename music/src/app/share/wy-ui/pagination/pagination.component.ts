import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() total: number;
  @Input() currentIndex: number;
  @Input() pageCount: number;
  @Output() currentIndexChange = new EventEmitter<number>;

  pageSize: number;
  showPrevBtn: boolean = false;
  showNextBtn: boolean = false;
  showLimit: number = 5;
  pageArr: Array<number> = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total']) {
      this.pageSize = Math.ceil(this.total / this.pageCount);
    }

    if (changes['currentIndex']) {
      this.setPageArr();
    }
  }

  ngOnInit(): void {
  }

  changeCurrentIndex(num: number) {
    this.currentIndex = num;
  }

  private setPageArr() {
    if (this.total > this.showLimit) {
      if (this.currentIndex < 3) {
        this.pageArr = [1, 2, 3, 4, 5];
      } else if (this.currentIndex > this.total - 2) {
        this.pageArr = [this.total - 4, this.total - 3, this.total - 2, this.total - 1, this.total];
      } else {
        this.pageArr = [this.currentIndex - 2, this.currentIndex - 1, this.currentIndex, this.currentIndex + 1, this.currentIndex + 2];
      }
    } else {
      for (let i = 0; i < this.total; i++) {
        this.pageArr.push(i);
      }
    }

  }
}
