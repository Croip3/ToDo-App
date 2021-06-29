import { Component } from '@angular/core';
import {TodoListService} from "./service/todo-list.service";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private todoListService: TodoListService) {
    this.todoListService.initTodoLists()
      .subscribe();
  }
}
