import {TodoListColor} from "./Color";

export interface TodosJson {
  allTodos: Todo[];
}

export interface TodoListsJson {
  todoLists: TodoList[];
}

export interface Todo {
  "id": number;
  "title": string;
  "description": string;
  "date": string;
  "start_time": string;
  "end_time": Date;
  "location": string;
  "priority": boolean;
  "sub_tasks": SubTask[];
  "user": string[];
  "labels": string[];
  "finished": boolean;
}

export interface SubTask {
  "task": string;
  "description": string;
  "priority": boolean;
  "finished": boolean;
}

export interface TodoList {
  id: number;
  title: string;
  todo_ids: number[];
  main: boolean;
  color?: TodoListColor
}

export interface TodoListWithTodos extends Omit<TodoList, 'todo_ids'> {
  todos: Todo[];
}
