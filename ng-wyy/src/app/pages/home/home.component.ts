import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { Banner, HotTag, SongSheet, Singer } from 'src/app/service/data-types/common.types';
import { NzCardComponent, NzCarouselComponent } from 'ng-zorro-antd';
import { SingerService } from 'src/app/service/singer.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { SheetService } from 'src/app/service/sheet.service';
import { AppStoreModule } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { SetSongList, SetPlayList, SetCurrentIndex } from 'src/app/actions/player.action';
import { PlayState } from 'src/app/reducers/player.reducer';
import { findIndex, shuffle } from 'src/utils/array';
import { getPlayer } from 'src/app/selectors/player.selectors';

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

  private playerState: PlayState;
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;

  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private store$: Store<AppStoreModule>
    ) {
    this.route.data.pipe(map(res => res.homeDatas)).subscribe(([banners, hotTags, songSheetList, singers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheetList = songSheetList;
      this.singers = singers;
    });

    this.store$.pipe(select(getPlayer)).subscribe(res => this.playerState = res);
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
      this.store$.dispatch(SetSongList({ songList: list }));
      let trueIndex = 0;
      let trueList = list.slice();

      if (this.playerState.playMode.type === 'random') {
        trueList = shuffle(list || []);
        trueIndex = findIndex(trueList, list[trueIndex]);
      }
      this.store$.dispatch(SetPlayList({ playList: list }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: trueIndex }));
    });
  }
}
