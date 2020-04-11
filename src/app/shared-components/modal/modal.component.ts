import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  template: `
    <div class="modal-wrapper" *ngIf="!hidden">
      <div class="modal">
        <div class="modal-header">
          <span class="modal-header__title">{{ title }}</span>
          <button class="modal-header__close" (click)="close()">×</button>
        </div>
        <div class="modal-content">
          <ng-content></ng-content>
        </div>
        <div class="modal-footer">
          <button class="modal-footer__btn" (click)="fireAction($event)">{{ actionButton }}</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string;
  @Input() actionButton = 'Update';
  @Output() actionEvent = new EventEmitter<any>();

  hidden = false;

  close() {
    console.log('close: ');
    this.hidden = true;
  }

  open() {
    console.log('open... ')
    this.hidden = false;
  }

  fireAction(e) {
    this.actionEvent.emit(e);
    this.close();
  }
}
