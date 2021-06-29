import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoListPageRoutingModule } from './todo-list-routing.module';

import { TodoListPage } from './todo-list.page';
import {TodoCardModule} from "../todo-card/todo-card.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoListPageRoutingModule,
    TodoCardModule
  ],
  declarations: [TodoListPage]
})
export class TodoListPageModule {}
