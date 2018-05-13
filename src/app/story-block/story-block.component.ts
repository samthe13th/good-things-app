import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'story-block',
  templateUrl: './story-block.component.html',
})
export class StoryBlockComponent implements OnInit {

  segment;
  segmentList;
  cue = [];

  @Input() staticBlock = true;
  @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
  @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
  @Input()
  set block(_block) {
    this._block = _block
  }
  get block() {
    return this._block;
  }
  private _block;

  ngOnInit() {
    if (this.staticBlock){
      this.segmentList = this.segmentList.replace(/\*/g,'');
      console.log('list: ', this.segmentList);
    }
    this.segmentList = this.block.value.split('/');
    this.cue.push({ type: this.block.type, value: this.segmentList[0] });
  }

  onFinishTyping(segment) {
    console.log('@storyblock advance');
    this.advanceScroll.emit(true);
    if (this.cue.length < this.segmentList.length) {
      this.cue.push({ type: this.block.type, value: this.segmentList[this.cue.length] });
    } else {
      this.finishedTyping.emit(true);
    }
  }
}
