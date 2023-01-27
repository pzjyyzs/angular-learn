import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User, Comment } from 'src/app/services/data-types';
import { SetOpenLoginModal } from 'src/app/store/actions/user.action';
import { getUser, getUserInfo } from 'src/app/store/selector/user.selector';
import { StoreIndexModule } from 'src/app/store/store.module';

@Component({
  selector: 'app-wy-comment',
  templateUrl: './wy-comment.component.html',
  styleUrls: ['./wy-comment.component.less']
})
export class WyCommentComponent implements OnInit, OnChanges {

  @Input() list: Array<Comment>;
  @Input() total: number;
  @Input() currentIndex: number;
  @Input() pageCount: number;
  @Output() changeCurrentIndex = new EventEmitter<number>;
  @Output() changeLike = new EventEmitter<boolean>;

  userImg: string;
  user: User;
  constructor(private store$: Store<StoreIndexModule>) {
    const appStore$ = this.store$.pipe(select(getUser));
    appStore$.pipe(select(getUserInfo)).subscribe(info => {
      this.user = info;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.userImg = this.user?.avatarUrl ? this.user.avatarUrl : 'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50';
    }
  }

  ngOnInit(): void {

  }

  changeIndex(index: number) {
    this.changeCurrentIndex.emit(index);
  }

  handleLike(isLike: boolean) {
    if (this.user) {
      this.changeLike.emit(isLike)
    } else {
      this.store$.dispatch(SetOpenLoginModal({ openLoginModal: true }));
    }
  }

  handleReplay() {
    if (this.user) {

    } else {
      this.store$.dispatch(SetOpenLoginModal({ openLoginModal: true }));
    }
  }

  handleReview() {
    if (this.user) {

    } else {
      this.store$.dispatch(SetOpenLoginModal({ openLoginModal: true }));
    }
  }
}
