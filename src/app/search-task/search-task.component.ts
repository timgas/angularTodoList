import {Component, OnInit} from '@angular/core';
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
  items: ItemsTodo[] = [];

  constructor(private taskSvc: TaskService) {
  }

  ngOnInit(): void {
    this.items = this.taskSvc.items;
  }

  sorting(event): void {
    this.taskSvc.sortList(event.target.className);
  }

  searchTaskItem(e): void {
    const temp = e.toLowerCase().trim();
    const matchesFindItems = this.items.filter(item => item.content.toLowerCase().indexOf(temp) !== -1);
    if (matchesFindItems) {
      this.taskSvc.searchTaskItem(matchesFindItems, e);
    }
  }
}
