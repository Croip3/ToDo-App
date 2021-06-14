import {Component, Input} from '@angular/core';
import {AddTodoListPage} from '../add-todo-list/add-todo-list.page';
import {ModalController} from '@ionic/angular';
import { SingleTodoPage } from '../single-todo/single-todo.page';
import { HttpClient } from '@angular/common/http';

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

  //public mainList: TodoList;
  public mainList: any;
  public otherLists: TodoList[];
  todoList: any[];

  private canRender = false;

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) {
    //this.mainList = Tab1Page.TODO_LISTS.find(({mainList}) => mainList);
    //this.otherLists = Tab1Page.TODO_LISTS.filter(({mainList}) => !mainList);

    //this.mainList = Tab1Page.TODO_LISTS.find(({mainList}) => mainList);

    this.getData();
    console.log("hi");
  }

  async test(){
    await this.getData();
  }

  async getData(){
    this.http.get('../../assets/data/todo.json').subscribe(
        (res)=>{
            console.log(res['allTodos']);
            console.log(res);
            this.mainList = res['allTodos'];
            //this.mainList = this.todoList;
            console.log('TESA:' + this.todoList);

            //this.mainList = Tab1Page.res.find(({mainList}) => mainList);
            console.log(this.mainList);

            this.canRender =  true;
        });
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddTodoListPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
