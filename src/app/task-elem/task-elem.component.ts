import {Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {TaskService} from '../shared/task.service';
import {fromEvent, Observable, SubscriptionLike} from 'rxjs';
import {distinctUntilChanged, map, take, filter} from 'rxjs/operators';
import {ModalService} from '../modal/modal.service';

@Component({
  selector: 'app-task-elem',
  templateUrl: './task-elem.component.html',
  styleUrls: ['./task-elem.component.css']
})
export class TaskElemComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() model = {
    id: null
  };
  @Input() index: number;
  @ViewChild('arrow') arrow: ElementRef;
  content: string;
  private streamArrow$: Observable<any>;
  private subscription$: SubscriptionLike;

  constructor(private taskSrv: TaskService,
              private modalSrv: ModalService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.streamArrow$ = fromEvent(this.arrow.nativeElement, 'click').pipe(
      // @ts-ignore
      map(item => item.target.className),
      take(1),
      distinctUntilChanged()
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  isDoneItemList(id): void {
    this.taskSrv.isDoneItemList(id);
  }

  setLevelImportance(): void {
    const id = this.model.id;
    this.subscription$ =
    this.streamArrow$.subscribe({
      next: item => this.taskSrv.setLevelImportance(item, id),
    });
  }

  openModal(event): void {
    let elem = event.target;
    if (elem.parentNode.id || elem.id) {  // To make sure we clicked on the element with the id attribute and its nested tag <i>
      // tslint:disable-next-line:no-unused-expression
      elem.parentNode.id ? elem = elem.parentNode : elem;
      const action = `m-${elem.id}-${this.index}`;
      this.modalSrv.open(action);
    }
  }

  closeModal(action): void {
    action = `${action}-${this.index}`; // this action = m-delete-index or m-edit-index.
    this.modalSrv.close(action);
  }

  saveChangeItem(action: string): void {
    if (action === 'm-delete') {
      this.taskSrv.remove(this.index);
    } else if (action === 'm-edit') {
      this.taskSrv.editTask( this.content, this.index);
      this.closeModal(action);
      this.content = '';
    }
  }

}
