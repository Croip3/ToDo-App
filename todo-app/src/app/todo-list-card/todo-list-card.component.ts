import {Component, Input, OnInit} from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

}
