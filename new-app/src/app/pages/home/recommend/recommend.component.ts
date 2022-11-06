import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner } from 'src/app/services/data-types';
import { HomeService } from 'src/app/services/home.service';
import { WyCarouselComponent } from '../components/wy-carousel/wy-carousel.component';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {
  banner: Banner[];
  _indexColor: string;

  @ViewChild('carousel') carousel: WyCarouselComponent;

  get indexColor(): string {
    return this._indexColor;
  }

  set indexColor(color) {
    this._indexColor = `url(${color}?imageView&blur=40x20)`;
  }

  constructor(
    private homeService: HomeService,
  ) {
    this.homeService.getBanners().subscribe(data => {
      this.banner = data;
      if (this.banner.length > 0) {
        this.indexColor = this.banner[0].imageUrl;
      }
    });
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
}
