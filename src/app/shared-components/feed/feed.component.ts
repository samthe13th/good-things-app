import { Component, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { interval, Observable, of } from 'rxjs';
import { delayWhen, tap } from 'rxjs/internal/operators';
import { last } from 'lodash';

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
export class FeedComponent implements OnChanges {
  @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
  @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
  @Output() currentBlock: EventEmitter<any> = new EventEmitter();

  @Input() feedDebounce = 0;
  @Input() user: string;

  feed: Observable<any>;
  currentSegment: Observable<any>;

  constructor(private story: StoryService) { }

  ngOnChanges() {
    this.feed = this.story.getStory().valueChanges().pipe(
      tap(v => {
        console.log('tap: ', v, ' delay: ', last(v) && last(v).type === 'story');
      }),
      delayWhen((v) => (last(v) && last(v).type === 'story') ? interval(this.feedDebounce) : of(undefined))
    );
    this.currentSegment = this.story.getCurrentSegment();
  }

  onFinishTyping(bool) {
    this.finishedTyping.emit(bool);
  }

  onAdvanceScroll(bool) {
    this.advanceScroll.emit(bool);
  }

  onCurrentBlockChange(block) {
    console.log("block change: ", block)
    this.currentBlock.emit(block);
  }
}
