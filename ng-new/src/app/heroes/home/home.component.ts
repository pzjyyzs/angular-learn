import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import {  filter, switchMap } from 'rxjs/operators';
import { UserService } from './../../services/user.service';
import { Hero } from './add-hero/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: Hero;
  breadcrumb: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userServe: UserService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        return combineLatest(
          this.route.firstChild.data,
          this.userServe.user$
        );
      })
    ).subscribe(([data, user]) => {
      console.log('NavigationEnd');
      console.log(user);
      if (data.breadcrumb?.length) {
        this.breadcrumb = data.breadcrumb;
      }
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
  }

}
