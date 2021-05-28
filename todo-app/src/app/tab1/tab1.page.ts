import {Component, Input} from '@angular/core';
import {AddTodoListPage} from '../add-todo-list/add-todo-list.page';
import {ModalController} from '@ionic/angular';

export interface TodoList {
  id: number;
  title: string;
  totalTasks: number;
  resolvedTasks: number;
  progress: number;
  mainList: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private static TODO_LISTS: TodoList[] = [
    {
      id: 1,
      title: 'My Stuff',
      totalTasks: 10,
      resolvedTasks: 7,
      progress: 0.7,
      mainList: true
    }, {
      id: 2,
      title: 'Uni',
      totalTasks: 10,
      resolvedTasks: 5,
      progress: 0.5,
      mainList: false
    }, {
      id: 3,
      title: 'Groceries',
      totalTasks: 10,
      resolvedTasks: 5,
      progress: 0.5,
      mainList: false
    }, {
      id: 3,
      title: 'Groceries',
      totalTasks: 10,
      resolvedTasks: 5,
      progress: 0.5,
      mainList: false
    }, {
      id: 3,
      title: 'Groceries',
      totalTasks: 10,
      resolvedTasks: 5,
      progress: 0.5,
      mainList: false
    }, {
      id: 3,
      title: 'Groceries',
      totalTasks: 10,
      resolvedTasks: 5,
      progress: 0.5,
      mainList: false
    },
  ];

  @Input() public todoLists: TodoList[];

  public mainList: TodoList;
  public otherLists: TodoList[];

  constructor(
    private modalController: ModalController
  ) {
    this.mainList = Tab1Page.TODO_LISTS.find(({mainList}) => mainList);
    this.otherLists = Tab1Page.TODO_LISTS.filter(({mainList}) => !mainList);
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddTodoListPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
