import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Todo, TodoListWithTodos} from "../interface/Todo";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-todo-list-card',
  templateUrl: './todo-list-card.component.html',
  styleUrls: ['./todo-list-card.component.scss'],
})
export class TodoListCardComponent implements OnInit {

  @Input() public todoList: TodoListWithTodos;

  public description: string;
  public progress: number;

  constructor(
    private router: Router,
    private navController: NavController
    ) { }

  ngOnInit() {
    this.description = this.getDescription(this.todoList.todos);
    this.progress = this.getProgress(this.todoList.todos);
  }

  //navigation to detail page
  test(){
    // const navigationExtras = {
    //   queryParams: {
    //     title: this.title,
    //     progress: this.progress,
    //     color: this.color
    //   }
    // };
    //
    // this.router.navigate(['single-todo'], navigationExtras);
  }

  public navigateToTodoList(id: number): Promise<boolean> {
    return this.navController.navigateForward(['todo-list', id]);
  }

  private getDescription(todos: Todo[]): string {
    const finishedTodos = todos.filter(todo => todo.finished).length;
    const totalTodos = todos.length;

    if (totalTodos === 0) {
      return 'Tap to add new task';
    }

    return `${finishedTodos} / ${totalTodos}`;
  }

  private getProgress(todos: Todo[]): number {
    const finishedTodos = todos.filter(todo => todo.finished).length;
    const totalTodos = todos.length;

    return finishedTodos / totalTodos;
  }
}
