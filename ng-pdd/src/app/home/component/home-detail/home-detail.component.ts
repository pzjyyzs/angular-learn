import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Channel } from 'src/app/share/pdd-ui/horizontal-grid/horizontal-grid.component';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDetailComponent implements OnInit {

  selectLink = '';
  imageSliders: ImageSlider[];
  channels: Channel[];
  constructor(private router: ActivatedRoute, private homeService: HomeService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.selectLink = params.get('tabLink');
    });
    this.homeService.getBanners().subscribe(banners => {
      this.imageSliders = banners;
      this.cdr.markForCheck();
    });
    this.homeService.getChannels().subscribe(channels => {
      this.channels = channels;
      this.cdr.markForCheck();
    });
  }

}
