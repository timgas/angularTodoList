import {Injectable} from '@angular/core';
import {ItemsTodo} from './interface-items';
import {BehaviorSubject, Observable} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable()
export class TaskService {

  items: ItemsTodo[] = [];
  private subj$: BehaviorSubject<any> = new BehaviorSubject([]);
  private toggle = false;

  constructor(private storage: StorageService) {
    this.load();
  }

  get todos(): Observable<any> {
    return this.subj$.asObservable();
  }

  create(text: string): ItemsTodo {
    return {
      id: Date.now(),
      importance: 5,
      content: text,
      done: false
    };
  }

  add(task): void {
    const temp = this.create(task);
    // @ts-ignore
    this.items.push(temp);
    this.subj$.next(this.items);
    this.save();
  }

  editTask(content, id): void {
    if (!content) {
      return;
    }
    const foundItem = this.findItem(id);
    foundItem.content = content;
    this.subj$.next(this.items);
    this.save();
  }

  remove(id): void {
    this.items = this.items.filter(elem => elem.id !== id);
    this.subj$.next(this.items);
    this.save();
  }

  sortList(param: string): void {
    const temp = this.items;
    temp.sort((a: any, b: any) => {
      switch (param) {
        case 'sort-date':
          a = a.id;
          b = b.id;
          break;
        case 'sort-importance' :
          a = a.importance;
          b = b.importance;
          break;
        case 'fas fa-filter':
          a = a.done;
          b = b.done;
      }

      if (this.toggle) {
        return a - b;
      } else {
        return b - a;
      }
    });
    this.toggle = !this.toggle;
    this.subj$.next(temp);
    this.save();
  }

  findItem(id): ItemsTodo {
    const temp = this.items;
    const index = temp.findIndex(item => item.id === id);
    return temp[index];
  }

  isDoneItemList(id): void {
    this.findItem(id).done = !this.findItem(id).done;
    this.subj$.next(this.items);
    this.save();
  }

  setLevelImportance(e: string, id: number): void {
    let tmpDigit = this.findItem(id).importance;
    if (e === 'arrow__importance up') {
      tmpDigit += 1;
      if (tmpDigit >= 10) {
        tmpDigit = 10;
      }
      this.findItem(id).importance = tmpDigit;
    } else if (e === 'arrow__importance down') {
      tmpDigit -= 1;
      if (tmpDigit <= 0) {
        tmpDigit = 0;
      }
    }
    this.findItem(id).importance = tmpDigit;
    this.subj$.next(this.items);
    this.save();
  }

  save(): void {
    this.storage.save(this.items);
  }

  load(): void {
    this.items = this.storage.load();
    this.subj$.next(this.items);
  }
}
