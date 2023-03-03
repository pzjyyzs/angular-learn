import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-remember',
  template: `
    <label>
      <input type="checkbox" (change)="onChecked($event)">
      Keep me logged in
    </label>
  `,
  styles: [
  ]
})
export class AuthRememberComponent implements OnInit {

  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit(): void {

  }

  onChecked(e: Event) {
    this.checked.emit((<HTMLInputElement>e.target).checked);
  }

}
