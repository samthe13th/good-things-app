import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'lodash';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'story-block',
  template: `
<div class="segment-wrapper" *ngFor="let segment of staticBlocks" >
  <div
    [style.background]="block.color"
    *ngIf="staticBlock && block.canView && block.user === user"
    style="display: inline-block; color: white;  padding: 2px 12px; border-radius: 10px">
    {{ segment.value }}
  </div>
  <div 
    *ngIf="staticBlock && block.user !== user"
    [style.color]="block.color !== undefined ? 'white' : 'inherit'"
    [style.padding]="block.color !== undefined ? '2px 12px' : 0"
    style="display: inline-block; border-radius: 10px"
    [style.background]="block.color">
    {{ segment.value }}
  </div>
</div>

<div class="segment-wrapper" *ngFor="let segment of cue">
  <div [style.background]="block.color" *ngIf="!staticBlock && block.canView && block.user !== 'admin'"
    style="display: inline-block; color: white; padding: 2px 12px; border-radius: 10px">
    {{ segment.value }}
  </div>
  <auto-type
    *ngIf="!staticBlock && block.canView === undefined || block.user === 'admin'"
    (typedSegment)="onFinishTyping($event)"
    [speed]="segment.speed"
    [typeString]="segment.value">
  </auto-type>
</div>`,
  styleUrls: ['./story-block.component.css']
})
export class StoryBlockComponent implements OnInit {
  segment;
  segmentList;
  cue = [];
  staticBlocks;
  showStarted = false;

  constructor(private db: AngularFireDatabase) {}

  @Input() staticBlock = true;
  @Input() user: string;
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
    this.segmentList = this.block.value.split('/');
    this.staticBlocks = map(this.segmentList, (segment) => {
      return { ...this.block, value: segment };
    });
    if (this.staticBlock === false) {
      this.cue.push({
        type: this.block.type,
        value: this.segmentList[0],
        speed: this.block.speed || 80
      });
    }
  }

  onFinishTyping(segment) {
    console.log("finish typing: ", segment)
    this.advanceScroll.emit(true);
    if (this.cue.length < this.segmentList.length) {
      console.log('speed: ', this.block.speed)
      this.cue.push({
        type: this.block.type,
        value: this.segmentList[this.cue.length],
        speed: this.block.speed || 80
      });
    } else {
      this.finishedTyping.emit(true);
    }
  }
}
