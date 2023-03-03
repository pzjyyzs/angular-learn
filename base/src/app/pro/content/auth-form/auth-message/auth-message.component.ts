import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-message',
  template: `
    <div>You will be logged in for {{ days }} days</div>
  `,
  styles: [
  ]
})
export class AuthMessageComponent implements OnInit {

  days: number = 7;
  constructor() { }

  ngOnInit(): void {
  }

}
