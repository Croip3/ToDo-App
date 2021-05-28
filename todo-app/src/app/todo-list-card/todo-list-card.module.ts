import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoListCardComponent } from './todo-list-card.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TodoListCardComponent],
  exports: [TodoListCardComponent]
})
export class TodoListCardModule {}
