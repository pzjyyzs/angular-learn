import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  @Input() value = '';
  @Output() onAdd = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  add($event) {
    if ($event.keyCode === 13) {
      this.onAdd.emit($event);
    }
  }
}
