import { SongSheet } from './../../../services/data-types';
import { combineLatest } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner } from 'src/app/services/data-types';
import { HomeService } from 'src/app/services/home.service';
import { WyCarouselComponent } from '../../../share/wy-ui/wy-carousel/wy-carousel.component';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {
  banner: Banner[] = [];
  songSheet: SongSheet[] = [];
  albums?: any[] = []
  _indexColor: string = "";

  @ViewChild('carousel') carousel!: WyCarouselComponent;

  get indexColor(): string {
    return this._indexColor;
  }

  set indexColor(color) {
    this._indexColor = `url(${color}?imageView&blur=40x20)`;
  }

  constructor(
    private homeService: HomeService,
    private songService: SongService,
  ) {
    combineLatest([this.homeService.getBanners(), this.homeService.getTopPlaylist(),
        this.homeService.getTopAlbum()])
      .subscribe(data => {
        console.log('123', data)
        this.banner = data[0];
        if (this.banner.length > 0) {
          this.indexColor = this.banner[0].imageUrl;
        }

        this.songSheet = data[1];
        this.albums = this.sliceAlbums(data[2]?.albums);

    })
  }

  ngOnInit(): void {
  }

  beforeChange(item: {from: number, to: number}): void {
    this.indexColor = this.banner[item.to].imageUrl;
  }

  changeImage(value: string): void {
    if (value === 'prev') {
      this.carousel.pre();
    } else {
      this.carousel.next();
    }
  }

  sliceAlbums(arr: any[]) {
    let total = [];
    let index = 2;
    while(index--) {
      total.push(arr.splice(0, 5));
    }
    return total;
  }
}
