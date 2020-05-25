import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-todo';
  value = '';
  todoList = [];

  id = 0;
  onAdd($event) {
    this.todoList.push({
      id: this.idMaker(),
      title: $event.target.value,
      status: null,
      deleted: false
    });
  }

  toggle($event) {
    $event.item.status = $event.item.status === 'completed' ? '' : 'completed';
    console.log($event.item)
  }

  delete($event) {
    console.log($event)
    $event.item.deleted = true;
  }

  private idMaker() {
    this.id += 1;
    return this.id;
  }
}
