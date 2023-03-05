import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-directives',
  template: `
    <div>
      <label for="">Credit Card Number
        <input name='credit-card' type="text" placeholder="Enter your 16-digit card number" appCreditCard>
      </label>

      <label appTooltip="3 digits, back of your card" #myTooltip="tooltip">
        Enter your security code
        <span (mousemove)="myTooltip.show()" (mouseout)="myTooltip.hide()">(?)</span>
        <input type="text">
      </label>

      <label>
        <ul>
            <li *myFor="let item of items; let i = index">
              {{ i }} Member: {{ item.name | json }}
            </li>
        </ul>
      </label>
    </div>
  `,
  styles: [
    ".tooltip { display: none }"
  ]
})
export class DirectivesComponent implements OnInit {

  items = [
    {
      name: 'test',
      age: 35,
      location: 'gz'
    },
    {
      name: 'name 2 ',
      age: 45,
      location: 'bj'
    },
    {
      name: 'name 3',
      age: 55,
      location: 'sh'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
