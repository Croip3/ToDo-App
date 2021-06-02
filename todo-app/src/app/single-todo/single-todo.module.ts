import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleTodoPageRoutingModule } from './single-todo-routing.module';

import { SingleTodoPage } from './single-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleTodoPageRoutingModule
  ],
  declarations: [SingleTodoPage]
})
export class SingleTodoPageModule {}
