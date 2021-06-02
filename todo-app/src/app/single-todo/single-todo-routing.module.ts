import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleTodoPage } from './single-todo.page';

const routes: Routes = [
  {
    path: '',
    component: SingleTodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleTodoPageRoutingModule {}
