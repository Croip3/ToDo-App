import { Injectable } from '@angular/core';
import { combineLatest, from, iif, Observable, of, ReplaySubject } from 'rxjs';
import {
  Todo,
  TodoList,
  TodoListsJson,
  TodoListWithTodos,
  TodosJson,
} from '../interface/Todo';
import {
  distinctUntilChanged,
  first,
  map,
  mergeMap,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private todoListsWithTodosInternal$: Observable<TodoListWithTodos[]>;

  private todoListsInternal$ = new ReplaySubject<TodoList[]>();
  //TODO: Move everything related to todos to todo service
  private todos$ = new ReplaySubject<Todo[]>();

  constructor(private http: HttpClient) {
    this.todoListsWithTodosInternal$ = this.getTodoListsWithTodos().pipe(
      shareReplay()
    );
  }

  public get todoListsWithTodos$(): Observable<TodoListWithTodos[]> {
    return this.todoListsWithTodosInternal$.pipe(first());
  }

  public get todoLists$(): Observable<TodoList[]> {
    return this.todoListsInternal$.pipe(first());
  }

  public observeTodoListsWithTodos(): Observable<TodoListWithTodos[]> {
    return this.todoListsWithTodosInternal$;
  }

  public observeTodoLists(): Observable<TodoList[]> {
    return this.todoListsInternal$;
  }

  public initTodoLists(): Observable<void> {
    return combineLatest([this.getTodoListsData(), this.getTodosData()]).pipe(
      tap(([todoLists, todos]) => {
        this.updateTodos(todos);
        this.updateTodoLists(todoLists);
      }),
      mergeMap(() => this.persistTodoLists())
    );
  }

  public getMainTodoList(): Observable<TodoListWithTodos> {
    return this.todoListsWithTodosInternal$.pipe(
      map((todoLists) => todoLists.find((todoList) => todoList.main))
    );
  }

  public getOtherTodoLists(): Observable<TodoListWithTodos[]> {
    return this.todoListsWithTodosInternal$.pipe(
      map((todoLists) => todoLists.filter((todo) => !todo.main))
    );
  }

  public getTodoListById(id: number): Observable<TodoListWithTodos> {
    return this.todoListsWithTodosInternal$.pipe(
      map((todoLists) => todoLists.find((todo) => todo.id === id))
    );
  }

  public getTodoListByTitle(title: string): Observable<TodoListWithTodos> {
    return this.todoListsWithTodosInternal$.pipe(
      map((todoLists) => todoLists.find((todo) => todo.title === title))
    );
  }

  public addTodoList(todoList: TodoList): Observable<TodoList[]> {
    return of(todoList).pipe(
      withLatestFrom(this.todoListsInternal$),
      map(([todoList, todoLists]) => {
        const newTodoLists = todoLists.concat(todoList);

        this.updateTodoLists(newTodoLists);
        return todoLists.concat(todoList);
      })
    );
  }

  private updateTodoLists(todoLists: TodoList[]): void {
    this.todoListsInternal$.next(todoLists);
  }

  private updateTodos(todos: Todo[]): void {
    this.todos$.next(todos);
  }

  private getTodoListsWithTodos(): Observable<TodoListWithTodos[]> {
    return combineLatest([this.todoListsInternal$, this.todos$]).pipe(
      map(([todoLists, todos]) =>
        todoLists.map(
          (todoList) =>
            ({
              ...todoList,
              todos: todos.filter((todo) =>
                todoList.todo_ids.includes(todo.id)
              ),
            } as TodoListWithTodos)
        )
      )
    );
  }

  private fetchTodoListsData(): Observable<TodoList[]> {
    return this.http.get('../../assets/data/todo-list.json').pipe(
      map((res) => res as TodoListsJson),
      map((todoListsJson) => todoListsJson.todoLists)
    );
  }

  private getTodoListsData(): Observable<TodoList[]> {
    return this.readTodoListsFromStorage().pipe(
      mergeMap((todoLists) =>
        iif(
          () => !!todoLists,
          this.readTodoListsFromStorage(),
          this.fetchTodoListsData()
        )
      )
    );
  }

  private getTodosData(): Observable<Todo[]> {
    return this.http.get('../../assets/data/todo.json').pipe(
      map((res) => res as TodosJson),
      map((todosJson) => todosJson.allTodos)
    );
  }

  private persistTodoLists(): Observable<void> {
    return this.todoListsInternal$.pipe(
      distinctUntilChanged(),
      mergeMap((todoLists) => this.writeTodoListsToStorage(todoLists))
    );
  }

  private writeTodoListsToStorage(todoLists: TodoList[]): Observable<void> {
    return from(
      Storage.set({
        key: 'todo_lists',
        value: JSON.stringify(todoLists),
      })
    );
  }

  private readTodoListsFromStorage(): Observable<TodoList[]> {
    return from(Storage.get({ key: 'todo_lists' })).pipe(
      map((data) => JSON.parse(data.value) as TodoList[])
    );
  }
}
