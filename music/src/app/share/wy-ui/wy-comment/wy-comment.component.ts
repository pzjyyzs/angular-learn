import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, Comment } from 'src/app/services/data-types';

@Component({
  selector: 'app-wy-comment',
  templateUrl: './wy-comment.component.html',
  styleUrls: ['./wy-comment.component.less']
})
export class WyCommentComponent implements OnInit {

  @Input() list: Array<Comment>;
  @Input() total: number;
  @Input() user?: User;
  @Input() currentIndex: number;
  @Input() pageCount: number;
  @Output() changeCurrentIndex = new EventEmitter<number>;

  constructor() { }

  ngOnInit(): void {
  }

  changeIndex(index: number) {
    this.changeCurrentIndex.emit(index);
  }
}
