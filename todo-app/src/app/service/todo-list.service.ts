import { Injectable } from '@angular/core';
import {combineLatest, Observable, ReplaySubject} from "rxjs";
import {Todo, TodoList, TodoListsJson, TodoListWithTodos, TodosJson} from "../interface/Todo";
import {first, map, shareReplay, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todoListsWithTodos$: Observable<TodoListWithTodos[]>;

  private todoLists$ = new ReplaySubject<TodoList[]>();
  //TODO: Move everything related to todos to todo service
  private todos$ = new ReplaySubject<Todo[]>();

  constructor(private http: HttpClient) {
    this.todoListsWithTodos$ = combineLatest([
      this.todoLists$,
      this.todos$
      ]
    )
      .pipe(
        map(([todoLists, todos]) =>
          todoLists
            .map(todoList => ({
              ...todoList,
              todos: todos.filter(todo => todoList.todo_ids.includes(todo.id))
            } as TodoListWithTodos))
        ),
        shareReplay()
      )
  }

  public initTodoLists(): Observable<TodoListsJson> {
    return combineLatest([
        this.getTodoListsData(),
        this.getTodosData()
      ]
    )
      .pipe(
        tap(([todoLists, todos]) => {
          this.updateTodos(todos.allTodos);
          this.updateTodoLists(todoLists.todoLists);
        }),
        map(([todoLists]) => todoLists)
      );
  }

  public getTodoLists(): Observable<TodoList[]> {
    return this.todoLists$
  }

  public getTodoListsWithTodos(): Observable<TodoListWithTodos[]> {
    return this.todoListsWithTodos$
  }

  public getMainTodoList(): Observable<TodoListWithTodos> {
    return this.getTodoListsWithTodos()
      .pipe(
        map(todoLists => todoLists.find(todoList => todoList.main)),
      );
  }

  public getOtherTodoLists(): Observable<TodoListWithTodos[]> {
    return this.getTodoListsWithTodos()
      .pipe(
        map(todoLists => todoLists.filter(todo => !todo.main))
      );
  }

  public getTodoListById(id: number): Observable<TodoListWithTodos> {
    return this.getTodoListsWithTodos()
      .pipe(
        map(todoLists => todoLists.find(todo => todo.id))
      );
  }

  public getTodoListByTitle(title: string): Observable<TodoListWithTodos> {
    return this.getTodoListsWithTodos()
      .pipe(
        map(todoLists => todoLists.find(todo => todo.title))
      );
  }

  public addTodoList(todoList: TodoList): Observable<TodoList[]> {
    return this.getTodoLists()
      .pipe(
        first(),
        tap(todoLists => this.updateTodoLists(todoLists.concat(todoList))),
      );
  }

  private updateTodoLists(todoLists: TodoList[]) {
    this.todoLists$.next(todoLists)
  }

  private updateTodos(todos: Todo[]) {
    this.todos$.next(todos)
  }

  private getTodoListsData(): Observable<TodoListsJson> {
    return this.http.get('../../assets/data/todo-list.json')
      .pipe(
        map(res => res as TodoListsJson),
      );
  }

  private getTodosData(): Observable<TodosJson> {
    return this.http.get('../../assets/data/todo.json')
      .pipe(
        map(res => res as TodosJson)
      );
  }
}
