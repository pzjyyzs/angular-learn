import { Component } from '@angular/core';
import { load, save } from 'src/utils/localStore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ng-todo';
  value = '';
  todoList = load('todoList') || [];

  id = 0;
  constructor() {
  }
  onAdd($event) {
    this.todoList.push({
      id: this.idMaker(),
      title: $event.target.value,
      status: null,
      deleted: false
    });
    save('todoList', this.todoList);
  }

  toggle($event) {
    $event.item.status = $event.item.status === 'completed' ? '' : 'completed';
    save('todoList', this.todoList);
  }

  delete($event) {
    $event.item.deleted = true;
    save('todoList', this.todoList);
  }

  private idMaker() {
    this.id += 1;
    return this.id;
  }
}
