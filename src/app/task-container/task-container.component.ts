import {Component, OnInit} from '@angular/core';
import {TaskService} from '../shared/task.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {

  items: Observable<any>;
  styleHide = '';

  constructor(private taskSrv: TaskService) {}

  ngOnInit(): void {
    this.items = this.taskSrv.todos;
  }

  handler(event: string): void {
    this.styleHide = event;
  }

}
