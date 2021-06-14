import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-card',
  templateUrl: './todo-list-card.component.html',
  styleUrls: ['./todo-list-card.component.scss'],
})
export class TodoListCardComponent implements OnInit {

  @Input() public title: string;
  @Input() public totalTasks: number;
  @Input() public resolvedTasks: number;
  @Input() public progress: number;
  @Input() public mainList: boolean;
  @Input() public color: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  test(){
    const navigationExtras = {
      queryParams: {
        title: this.title,
        progress: this.progress,
        color: this.color
      }
    };

    this.router.navigate(['single-todo'], navigationExtras);
  }

}
