import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
//import getTodoListById from '../service/todo-list.service';
import { TodoListService } from '../service/todo-list.service';
import { Observable } from 'rxjs';
import { TodoListWithTodos } from '../interface/Todo';

import { SingleTodoService } from '../service/single-todo/single-todo-service.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.page.html',
  styleUrls: ['./single-todo.page.scss'],
})
export class SingleTodoPage implements OnInit {
  title: any;
  progress: any;
  color: any;
  description: any;
  date: any;
  startTime: any;
  endTime: any;
  location: any;

  public todoList$: Observable<TodoListWithTodos>;
  todo: any;
  id: number;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private todolistservice: TodoListService,
    private singletodoservice: SingleTodoService
  ) {
    /*this.route.queryParams.subscribe((params) => {
      if (params && params.title) {
        this.title = params.title;
      }
      if (params && params.progress) {
        this.progress = params.progress;
      }
      if (params && params.color) {
        this.color = params.color;
      }
      if (params && params.description) {
        this.description = params.description;
      }
      if (params && params.date) {
        this.date = params.date;
      }
      if (params && params.startTime) {
        this.startTime = params.startTime;
      }
      if (params && params.endTime) {
        this.endTime = params.endTime;
      }
      if (params && params.location) {
        this.location = params.location;
      }
    });*/
  }

  ngOnInit() {
    //this.todoList$ = this.todolistservice.getTodoListById(1);

    this.testfunc();
  }

  async testfunc() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['list_id']);
    });
    this.todo = await this.singletodoservice.getTodoDataById(this.id);
  }

  goBack() {
    this.navCtrl.back();
  }
}
