import {Component, ElementRef, Input, OnInit, OnDestroy, Renderer2, ViewEncapsulation} from '@angular/core';
import {ModalService} from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id;
  content: string;
  element: HTMLElement;

  constructor(private modalSrv: ModalService,
              private el: ElementRef,
              private renderer: Renderer2) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.element.addEventListener('click', event => {
      // @ts-ignore
      if (event.target.className === 'modal-overlay') {
        this.close();
      }
    });
    this.modalSrv.add(this);
  }

  ngOnDestroy(): void {
    this.modalSrv.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.setShowModal('block');
  }

  close(): void {
    this.setShowModal('none');
  }

  setShowModal(val): void {
    this.renderer.setStyle(this.element, 'display', val);
  }
}
