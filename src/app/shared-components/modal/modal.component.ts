import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  template: `
    <div class="modal-wrapper" *ngIf="!hidden">
      <div class="modal">
        <div class="modal-header">
          <span class="modal-header__title">{{ title }}</span>
          <button class="modal-header__close" (click)="beforeClose($event)">×</button>
        </div>
        <div class="modal-content">
          <ng-content></ng-content>
        </div>
        <div class="modal-footer" *ngIf="actionButton">
          <button
            class="modal-footer__btn"
            (click)="fireAction($event)">{{ actionButtonTitle }}</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string;
  @Input() actionButtonTitle = 'Update';
  @Input() actionButton = true;

  @Output() actionEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();

  hidden = true;

  beforeClose(e) {
    this.closeEvent.emit(e);
    this.close();
  }

  close() {
    this.hidden = true;
  }

  open() {
    this.hidden = false;
  }

  fireAction(e) {
    this.actionEvent.emit(e);
    this.close();
  }
}
