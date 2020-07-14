import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Channel } from 'src/app/share/pdd-ui/horizontal-grid/horizontal-grid.component';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { filter, map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { ImageSlider } from 'src/app/services/data-types/common';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDetailComponent implements OnInit {

  selectLink = '';
  imageSliders$: Observable<ImageSlider[]>;
  channels$: Observable<Channel[]>;
  selectedTabLink$: Observable<string>;
  constructor(private router: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit() {

    this.selectedTabLink$ = this.router.paramMap
      .pipe(
        filter(params => {
          return params.has('tabLink');
        }),
        map(params => params.get('tabLink'))
      );
    this.imageSliders$ = this.homeService.getBanners();
    this.channels$ = this.homeService.getChannels();
  }

}
