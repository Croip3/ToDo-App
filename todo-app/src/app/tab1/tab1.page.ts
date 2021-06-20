import {Component} from '@angular/core';
import {AddTodoListPage} from '../add-todo-list/add-todo-list.page';
import {ModalController} from '@ionic/angular';
import {TodoListWithTodos} from "../interface/Todo";
import {Observable} from "rxjs";
import {TodoListService} from "../service/todo-list.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public mainTodoList$: Observable<TodoListWithTodos>;
  public otherTodoLists$: Observable<TodoListWithTodos[]>;

  constructor(
    private modalController: ModalController,
    private todoListService: TodoListService
  ) {

    this.mainTodoList$ = this.todoListService.getMainTodoList();
    this.otherTodoLists$ = this.todoListService.getOtherTodoLists();
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddTodoListPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
