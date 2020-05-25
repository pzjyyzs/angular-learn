import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() item;
  @Output() toggle = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onToggle($event, item) {
    this.toggle.emit({$event, item});
  }

  onDelete($event, item) {
    this.delete.emit({$event, item});
  }
}
