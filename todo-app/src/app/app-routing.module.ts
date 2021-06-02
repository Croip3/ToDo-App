import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-todo-list',
    loadChildren: () => import('./add-todo-list/add-todo-list.module').then( m => m.AddTodoListPageModule)
  },  {
    path: 'single-todo',
    loadChildren: () => import('./single-todo/single-todo.module').then( m => m.SingleTodoPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
