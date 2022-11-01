import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/services/data-types';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {
  banner: Banner[];

  _indexColor: string;

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
    if (item.to) {
      this.indexColor = this.banner[item.to].imageUrl;
    }
  }
}
