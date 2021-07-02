import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTodoListPageRoutingModule } from './add-todo-list-routing.module';

import { AddTodoListPage } from './add-todo-list.page';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddTodoListPageRoutingModule
  ],
  declarations: [AddTodoListPage]
})
export class AddTodoListPageModule {}
