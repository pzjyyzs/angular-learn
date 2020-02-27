import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { Banner, HotTag, SongSheet, Singer } from 'src/app/service/data-types/common.types';
import { NzCardComponent, NzCarouselComponent } from 'ng-zorro-antd';
import { SingerService } from 'src/app/service/singer.service';

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
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;
  constructor(private homeServe: HomeService, private singerServe: SingerService) {
    this.getBanners();
    this.getHotTags();
    this.getPersonalizedSheetList();
    this.getEnterSingers();
  }

  ngOnInit() {
  }

  private getBanners() {
    this.homeServe.getBanners().subscribe(banners => {
      this.banners = banners;
    });
  }
  private getHotTags() {
    this.homeServe.getHotTags().subscribe(tags => {
      this.hotTags = tags;
    });
  }
  private getPersonalizedSheetList() {
    this.homeServe.getPerosonalSheetList().subscribe(sheets => {
      this.songSheetList = sheets;
    });
  }
  private getEnterSingers() {
    this.singerServe.getEnterSinger().subscribe(singer => {
      this.singers = singer;
    })
  }
  OnBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }
}
