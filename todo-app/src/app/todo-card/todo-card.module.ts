import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {TodoCardComponent} from "./todo-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [TodoCardComponent],
  exports: [TodoCardComponent]

})
export class TodoCardModule {}
