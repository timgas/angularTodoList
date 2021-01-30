import {Component, OnInit} from '@angular/core';
import {TaskService} from '../shared/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

   valueInput: string;

  constructor(private taskSrv: TaskService) { }

  ngOnInit(): void {
  }

  addTask(): void {
    if (!this.valueInput || this.valueInput.length > 300) {
      window.alert('Ваш таск не може бути пустим, або мати більше 300 символів');
    } else {
      this.taskSrv.add(this.valueInput.trim());
      this.valueInput = '';
    }
  }

}
