import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modals: any[] = [];

  constructor() { }

  add(model: any): void {
    // @ts-ignore
    this.modals.push(model);
  }

  remove(id): void {
    this.modals = this.modals.filter(item => item.id !== id);
  }

  open(id): void {
    const modal = this.modals.find(item => item.id === id);
    // @ts-ignore
    modal.open();
  }

  close(id): void {
    const modal = this.modals.find(item => item.id === id);
    modal.close();
  }

}
