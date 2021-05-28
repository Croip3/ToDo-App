import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTodoListPageRoutingModule } from './add-todo-list-routing.module';

import { AddTodoListPage } from './add-todo-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTodoListPageRoutingModule
  ],
  declarations: [AddTodoListPage]
})
export class AddTodoListPageModule {}
