import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

}
