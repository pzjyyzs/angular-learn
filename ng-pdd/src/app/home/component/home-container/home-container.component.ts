import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { Observable } from 'rxjs';
import { TopMenu } from 'src/app/services/data-types/common';
import { filter, map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent implements OnInit {

  topMenus$: Observable<TopMenu[]>;
  selectedTabLink$: Observable<string>;
  constructor(private router: Router, private service: HomeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this. topMenus$ = this.service.getTabs();
    this.selectedTabLink$ = this.route.firstChild.paramMap
    .pipe(
      filter(params => params.has('tabLink')),
      map(params => params.get('tabLink'))
    );
  }

  handleTabSelected(topMenu: TopMenu) {
    this.router.navigate(['home', topMenu.link]);
  }

}
