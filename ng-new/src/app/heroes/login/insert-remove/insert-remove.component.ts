import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-insert-remove',
  templateUrl: './insert-remove.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class InsertRemoveComponent implements OnInit {
  isShown = true;
  constructor() { }

  ngOnInit(): void {
  }

}
