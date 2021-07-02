import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TodoListColor, TodoListColors} from "../interface/Color";
import {COLORS} from "../constants/colors.constants";
import {Observable} from "rxjs";
import {Todo, TodoList} from "../interface/Todo";
import {TodoListService} from "../service/todo-list.service";
import {first, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-add-todo-list',
  templateUrl: './add-todo-list.page.html',
  styleUrls: ['./add-todo-list.page.scss'],
})
export class AddTodoListPage implements OnInit {

  public todoListForm: FormGroup;
  public colors: TodoListColors;

  public todos$: Observable<Todo[]>;

  private todoLists$: Observable<TodoList[]>;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private todoListService: TodoListService
  ) {
    this.todoListForm = this.getFormGroup();
    this.colors = COLORS;

    this.todos$ = this.todoListService.todos$;
    this.todoLists$ = this.todoListService.todoLists$;
  }

  ngOnInit() {
  }

  public dismissModal(): void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public setTodoListColor(color: TodoListColor): void {
    this.todoListForm.patchValue({'color': color})
  }

  public addTodoList(todoListForm: FormGroup): void {
    this.todoLists$
      .pipe(
        map(todoLists => this.getTodoListFromForm(todoLists, todoListForm)),
        switchMap(todoList => this.todoListService.addTodoList(todoList)),
        first()
      )
      .subscribe(() => this.dismissModal());
  }

  private getFormGroup(): FormGroup {
    return this.formBuilder.group({
      title: [''],
      color: [''],
      todos: ['']
    });
  }

  private getTodoListFromForm(todoLists: TodoList[], todoListForm: FormGroup): TodoList {
    return {
      id: Math.max(...todoLists.map(todoList => todoList.id)) + 1,
      title: todoListForm.value.title,
      color: todoListForm.value.color,
      main: false,
      todo_ids: todoListForm.value.todos.map(id => parseInt(id))
    } as TodoList;
  }

}
