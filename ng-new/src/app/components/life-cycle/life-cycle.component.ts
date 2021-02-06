import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styles: [
  ]
})
export class LifeCycleComponent implements OnChanges, OnInit {

  @Input() title: string;
  constructor() {
    console.log('constructor', this.title);
   }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
