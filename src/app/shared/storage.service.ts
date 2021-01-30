import { Injectable } from '@angular/core';
import {ItemsTodo} from './interface-items';

@Injectable()
export class StorageService {

  localstorage: any = window.localStorage;
  readonly KEY: string = 'Items';

  constructor() { }

  save(data: ItemsTodo[]): void {
    const dataStr = JSON.stringify(data);
    console.log(dataStr);
    localStorage.setItem(this.KEY, dataStr);
  }

  load(): [] {
    const dataStr = this.localstorage.getItem(this.KEY);
    return dataStr ? JSON.parse(dataStr) : [];
  }

}
