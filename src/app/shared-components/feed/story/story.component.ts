import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'story',
  template: `
  <div style="height: 200px"></div>
  <div *ngFor="let segment of segments; let i = index">
    <div *ngIf="segment.value !== ''" class="story__typed-segment">
      <story-block
        *ngIf="(segment.canView === undefined || segment.canView === user || segment.isPrivate === false)"
        (advanceScroll)="onAdvanceScroll($event)"
        (finishedTyping)="onFinishTyping($event)"
        [block]="segment"
        [user]="user"
        [staticBlock]="segment.type === 'start' || (i < (segments.length - 1))">
      </story-block>
    </div>
  </div>
  <div style="height: 200px"></div>`,
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
 initialized = false;

 @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
 @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
 @Output() currentBlock: EventEmitter<any> = new EventEmitter();
 @Input() user: string;

 private _segments;
 @Input()
  get segments() { return this._segments }
  set segments(value) {
    if (value) {
      this.currentBlock.emit(value[value.length - 1]);
      this._segments = value;
    }
  }

  onFinishTyping(segment) {
    this.finishedTyping.emit(true);
  }

  onAdvanceScroll(boolean) {
    this.advanceScroll.emit(boolean);
  }
}
