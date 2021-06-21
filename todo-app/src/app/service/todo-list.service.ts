import { Injectable } from '@angular/core';
import {combineLatest, Observable, ReplaySubject} from "rxjs";
import {Todo, TodoList, TodoListsJson, TodoListWithTodos, TodosJson} from "../interface/Todo";
import {first, map, shareReplay, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todoListsWithTodosInternal$: Observable<TodoListWithTodos[]>;

  private todoListsInternal$ = new ReplaySubject<TodoList[]>();
  //TODO: Move everything related to todos to todo service
  private todos$ = new ReplaySubject<Todo[]>();

  constructor(private http: HttpClient) {
    this.todoListsWithTodosInternal$ = this.getTodoListsWithTodos()
      .pipe(
        shareReplay()
      );
  }

  public get todoListsWithTodos$(): Observable<TodoListWithTodos[]> {
    return this.todoListsWithTodosInternal$
      .pipe(
        first()
      )
  }

  public get todoLists$(): Observable<TodoList[]> {
    return this.todoListsInternal$
      .pipe(
        first()
      );
  }

  public observeTodoListsWithTodos(): Observable<TodoListWithTodos[]> {
    return this.todoListsWithTodosInternal$;
  }

  public observeTodoLists(): Observable<TodoList[]> {
    return this.todoListsInternal$;
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

  public getMainTodoList(): Observable<TodoListWithTodos> {
    return this.todoListsWithTodosInternal$
      .pipe(
        map(todoLists => todoLists.find(todoList => todoList.main)),
      );
  }

  public getOtherTodoLists(): Observable<TodoListWithTodos[]> {
    return this.todoListsWithTodosInternal$
      .pipe(
        map(todoLists => todoLists.filter(todo => !todo.main))
      );
  }

  public getTodoListById(id: number): Observable<TodoListWithTodos> {
    return this.todoListsWithTodosInternal$
      .pipe(
        map(todoLists => todoLists.find(todo => todo.id === id))
      );
  }

  public getTodoListByTitle(title: string): Observable<TodoListWithTodos> {
    return this.todoListsWithTodosInternal$
      .pipe(
        map(todoLists => todoLists.find(todo => todo.title === title))
      );
  }

  public addTodoList(todoLists: TodoList[], todoList: TodoList): void {
        this.updateTodoLists(todoLists.concat(todoList));
  }

  private updateTodoLists(todoLists: TodoList[]): void {
    this.todoListsInternal$.next(todoLists)
  }

  private updateTodos(todos: Todo[]): void {
    this.todos$.next(todos)
  }

  private getTodoListsWithTodos(): Observable<TodoListWithTodos[]> {
    return  combineLatest([
        this.todoListsInternal$,
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
        )
      );
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
