import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
 @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
 @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
 @Input() 
  set segments(value) {
    this._segments = value;
  }
  get segments(){
    return this._segments;
  }
  private _segments;

  onFinishTyping(segment) {
    console.log('finish typing block: ', segment)
    this.finishedTyping.emit(true);
  }

  onAdvanceScroll(boolean) {
    console.log('@story advance')
    this.advanceScroll.emit(boolean);
  }
}
