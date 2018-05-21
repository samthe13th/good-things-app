import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'lodash';

@Component({
  selector: 'story-block',
  templateUrl: './story-block.component.html',
  styleUrls: ['./story-block.component.css']
})
export class StoryBlockComponent implements OnInit {

  segment;
  segmentList;
  cue = [];
  staticBlocks;

  @Input() staticBlock = true;
  @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
  @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
  @Input()
  set block(_block) {
    console.log('story block: ', _block)
    this._block = _block
  }
  get block() {
    return this._block;
  }
  private _block;

  ngOnInit() {
    this.segmentList = this.block.value.split('/');
    this.staticBlocks = map(this.segmentList, (segment) => {
      return { ...this.block, value: segment }
    });
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
