import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {TaskService} from '../shared/task.service';
import {from, fromEvent, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ItemsTodo} from '../shared/interface-items';


@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {

  content: string;
  items: Observable<any>;
  @Output() searchItem: EventEmitter<any> = new EventEmitter();

  constructor(private taskSvc: TaskService) {
  }

  ngOnInit(): void {
    this.items = this.taskSvc.todos;
  }

  sorting(event): void {
    const className = event.target.className;
    const checkElementClassName = ['sort-date', 'sort-importance', 'fas fa-filter'];
    if (!checkElementClassName.includes(className)) { return; }
    this.taskSvc.sortList(className);
  }

  searchTaskItem(e): void {
    const transform =  e.toLowerCase().trim();
    this.searchItem.emit(transform);
  }

}
