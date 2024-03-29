import { Component, OnInit } from '@angular/core';

type linkItem = {
  path: string;
  name: string;
}
@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.less']
})
export class ProComponent implements OnInit {

  routerLink: Array<linkItem> = [];
  constructor() { }

  ngOnInit(): void {
    this.routerLink = [
      { path: 'content', name: 'content' },
      { path: 'pipe', name: 'pipe' },
      { path: 'directives', name: 'directives' },
      { path: 'form', name: 'reactive-form' },
      { path: 'router', name: 'router' }
    ]
  }

}
