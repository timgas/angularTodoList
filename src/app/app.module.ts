import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SearchTaskComponent } from './search-task/search-task.component';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskElemComponent } from './task-elem/task-elem.component';
import {RouterModule} from '@angular/router';
import {TaskService} from './shared/task.service';
import {StorageService} from './shared/storage.service';
import { ModalComponent } from './modal/modal.component';
import {ModalModule} from './modal/modal.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTaskComponent,
    SearchTaskComponent,
    TaskContainerComponent,
    TaskElemComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule
    ],
  providers: [TaskService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
