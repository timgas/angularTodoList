import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {TaskContainerComponent} from './task-container/task-container.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'todo-list', component: TaskContainerComponent},
   {path: '', redirectTo: 'login', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
