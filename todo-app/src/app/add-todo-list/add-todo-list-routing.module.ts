import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTodoListPage } from './add-todo-list.page';

const routes: Routes = [
  {
    path: '',
    component: AddTodoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTodoListPageRoutingModule {}
