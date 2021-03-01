import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-open-close',
  templateUrl: './open-close.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => close', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class OpenCloseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
