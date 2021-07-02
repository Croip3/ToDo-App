import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';

import {Tab1PageRoutingModule} from './tab1-routing.module';
import {TodoListCardModule} from '../todo-list-card/todo-list-card.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TodoListCardModule,
    Tab1PageRoutingModule,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {
}
