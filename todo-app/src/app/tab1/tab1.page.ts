import {Component} from '@angular/core';
import {AddTodoListPage} from '../add-todo-list/add-todo-list.page';
import {ModalController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {TodoListsJson, TodoListWithTodos, TodosJson} from "../interface/Todo";
import {combineLatest, Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public mainTodoList$: Observable<TodoListWithTodos>;
  public otherTodoLists$: Observable<TodoListWithTodos[]>;

  private todoLists$: Observable<TodoListWithTodos[]>;
  private todoListsData$: Observable<TodoListsJson>;
  private todosData$: Observable<TodosJson>;

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) {

    this.todoListsData$ = this.getTodoListsData()
      .pipe(
        shareReplay()
      );

    this.todosData$ = this.getTodosData()
      .pipe(
        shareReplay()
      );

    this.todoLists$ = this.getTodoListsWithTodos();
    this.mainTodoList$ = this.getMainTodoList();
    this.otherTodoLists$ = this.getOtherTodoLists();
  }

  private getTodoListsData(): Observable<TodoListsJson> {
    return this.http.get('../../assets/data/todo-list.json')
      .pipe(
        map(res => res as TodoListsJson)
      );
  }

  private getTodosData(): Observable<TodosJson> {
    return this.http.get('../../assets/data/todo.json')
      .pipe(
        map(res => res as TodosJson)
      );
  }

  private getMainTodoList(): Observable<TodoListWithTodos> {
    return this.todoLists$
      .pipe(
        map(todoLists => todoLists.find(todoList => todoList.main)),
      );
  }

  private getTodoListsWithTodos(): Observable<TodoListWithTodos[]> {
    return combineLatest([
        this.todoListsData$,
        this.todosData$
      ]
    )
      .pipe(
        map(([todoListsJson, todosJson]) =>
          todoListsJson.todoLists
            .map(todoList => ({
              ...todoList,
              todos: todosJson.allTodos.filter(todo => todoList.todo_ids.includes(todo.id))
            } as TodoListWithTodos))
        )
      );
  }

  private getOtherTodoLists(): Observable<TodoListWithTodos[]> {
    return this.todoLists$
      .pipe(
        map(todoLists => todoLists.filter(todo => !todo.main))
      );
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddTodoListPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
