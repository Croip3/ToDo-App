import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../service/todo-list.service';
import { Observable } from 'rxjs';
import { TodoListWithTodos } from '../interface/Todo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  public buttonLabel: string = 'My Lists';

  public todoListId: number;

  public todoList$: Observable<TodoListWithTodos>;

  constructor(
    private route: ActivatedRoute,
    private todoListService: TodoListService
  ) {
    this.todoListId = Number(this.route.snapshot.params.id);
  }

  ngOnInit() {
    this.todoList$ = this.todoListService.getTodoListById(this.todoListId);
    console.log(this.todoList$);
  }
}
