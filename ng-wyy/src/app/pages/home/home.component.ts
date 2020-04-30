import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Banner, HotTag, SongSheet, Singer } from 'src/app/service/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { SheetService } from 'src/app/service/sheet.service';


import { getPlayer } from 'src/app/selectors/player.selectors';
import { BatchActionsService } from 'src/app/store/batch-actions.service';
import { ModalTypes } from 'src/app/reducers/member.reducer';
import { User } from 'src/app/service/data-types/member.types';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { getUserId, getMember } from 'src/app/selectors/member.selectors';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  carouselActiveIndex = 0;
  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  singers: Singer[];
  user: User;


  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sheetService: SheetService,
    private batchActionsServe: BatchActionsService,
    private store$: Store<AppStoreModule>,
    private memberServe: MemberService
  ) {
    this.route.data.pipe(map(res => res.homeDatas)).subscribe(([banners, hotTags, songSheetList, singers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheetList = songSheetList;
      this.singers = singers;
    });

    const appStore$ = this.store$.pipe(select(getMember));
    appStore$.pipe(select(getUserId)).subscribe(id => {
      if (id) {
        this.getUserDetail(id);
      } else {
         this.user = null;
      }
    });
  }

  ngOnInit() {
  }

  OnBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  onPlaySheet(id: number) {
    this.sheetService.playSheet(id).subscribe(list => {
      this.batchActionsServe.selectPlayList({ list, index: 0});
    });
  }

  toInfo(id: number) {
    this.router.navigate(['./sheetInfo', id]);
  }

  openModal() {
    this.batchActionsServe.controlModal(true, ModalTypes.Default);
  }

  private getUserDetail(id: string) {
    this.memberServe.getUserDetail(id).subscribe(user => this.user = user)
  }
}
