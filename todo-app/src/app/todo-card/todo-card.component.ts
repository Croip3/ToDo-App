import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../interface/Todo";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {

  @Input() public todo: Todo;

  public totalSubTasks: number;
  public finishedSubTasks: number;
  public progress: number;

  constructor(private navController: NavController) {

  }

  ngOnInit() {
    this.initProgress();
  }

  public navigateToTodo(id: number): Promise<boolean> {
    return this.navController.navigateForward(['single-todo', id]);
  }

  private initProgress(): void {
    const subTasks = this.todo.sub_tasks;

    this.finishedSubTasks = subTasks.filter(subTask => subTask.finished).length;
    this.totalSubTasks = subTasks.length;

    this.progress = this.finishedSubTasks / this.totalSubTasks;
  }
}
