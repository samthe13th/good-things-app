import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
 @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
 @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
 @Output() currentBlock: EventEmitter<any> = new EventEmitter();
 @Input() user: string;
 @Input() 
  set segments(value) {
    console.log('segments: ', value)
    console.log('user: ', this.user)
    if (value){
    this.currentBlock.emit(value[value.length - 1]);
    this._segments = value;
    }
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
