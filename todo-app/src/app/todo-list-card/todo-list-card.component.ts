import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TodoListWithTodos} from "../interface/Todo";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-todo-list-card',
  templateUrl: './todo-list-card.component.html',
  styleUrls: ['./todo-list-card.component.scss'],
})
export class TodoListCardComponent implements OnInit {

  @Input() public todoList: TodoListWithTodos;

  public description: string;
  public showProgress: boolean;
  public progress: number;

  constructor(
    private router: Router,
    private navController: NavController
    ) { }

  ngOnInit() {
    this.initProgress();
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

  private initProgress(): void {
    const todos = this.todoList.todos;

    const finishedTodos = todos.filter(todo => todo.finished).length;
    const totalTodos = todos.length;

    this.description = totalTodos ? `${totalTodos} Items` : 'No items yet';
    this.showProgress = !!totalTodos;
    this.progress = finishedTodos / totalTodos;
  }
}
