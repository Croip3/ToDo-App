import { Component } from '@angular/core';
import { TodoListService } from './service/todo-list.service';
import { SplashScreen } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

/*SplashScreen.show({
  autoHide: false
});*/
export class AppComponent {
  constructor(private todoListService: TodoListService) {
    this.todoListService.initTodoLists().subscribe();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    SplashScreen.show({
      autoHide: false,
    });
  }
}
