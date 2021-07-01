import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SingleTodoService {
  test: string;
  json: any;
  data: any;
  constructor(private http: HttpClient) {
    this.json = {};

    //this.getJson();
  }

  public get() {
    console.log(this.data);
  }

  public async getTodoDataById(id) {
    const json = await this.getJson().toPromise();
    //console.log(json['allTodos']);

    json['allTodos'].forEach((todo) => {
      if (todo.id === id) {
        console.log(todo);
        this.data = todo;
      }
    });
    return this.data;
  }

  private getJson() {
    return this.http.get('../../../assets/data/todo.json').pipe(
      map((res) => res as any),
      map((todosJson) => todosJson)
    );
    //return fetch('../../../assets/data/todo.json');
    //.then((res) => res.json())
    //.then((json) => {
    //this.data = json;
    //});
  }
}
