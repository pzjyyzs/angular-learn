import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad, Product } from 'src/app/services/data-types/common';
import { switchMap, filter, map } from 'rxjs/internal/operators';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendComponent implements OnInit {

  ad$: Observable<Ad>;
  products$: Observable<Product[]>;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.ad$ = this.homeService.getAdByTab('men').pipe(
      filter(ads => ads.length > 0),
      map(ads => ads[0])
    );
    this.products$ = this.homeService.getProductsByTab('men');
  }

}
