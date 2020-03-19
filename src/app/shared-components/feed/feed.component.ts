import { Component, OnInit, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'feed',
  template: `
  <story
    [user]="user"
    (currentBlock)="onCurrentBlockChange($event)"
    (advanceScroll)="onAdvanceScroll($event)"
    (finishedTyping)="onFinishTyping($event)"
    [segments]="feed | async">
  </story>`,
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
  @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
  @Output() currentBlock: EventEmitter<any> = new EventEmitter();

  @Input() user: string;

  feed: Observable<any>;
  currentSegment: Observable<any>;

  constructor(private story: StoryService) { }

  ngOnInit() {
    this.feed = this.story.getStory().valueChanges();
    this.currentSegment = this.story.getCurrentSegment();
    console.log('init feed: ', this.feed);
  }

  ngOnChanges() {
    this.feed = this.story.getStory().valueChanges();
    this.currentSegment = this.story.getCurrentSegment();
    console.log('change... ', this.feed, this.currentSegment);
  }

  onFinishTyping(bool) {
    this.finishedTyping.emit(bool);
  }

  onAdvanceScroll(bool) {
    this.advanceScroll.emit(bool);
  }

  onCurrentBlockChange(block) {
    this.currentBlock.emit(block);
  }
}
