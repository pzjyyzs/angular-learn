import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

  constructor(private router: Router, private service: HomeService) {}
  topMenus: TopMenu[];

  ngOnInit(): void {
    this.service.getTabs().subscribe(banner => {
     this.topMenus = banner;
    });
  }

  handleTabSelected(topMenu: TopMenu) {
    this.router.navigate(['home', topMenu.link]);
  }

}
