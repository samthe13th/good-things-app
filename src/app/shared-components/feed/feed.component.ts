import { Component, OnChanges, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { interval, Observable, of } from 'rxjs';
import { debounceTime, delayWhen, tap } from 'rxjs/internal/operators';
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
  styleUrls: ['./feed.component.css'],
  host: {
    '[class.feed]': 'true',
    '[class.fade-out]': '!visible',
    '[class.fade-in]': 'visible'
  }
})
export class FeedComponent implements OnChanges, AfterViewInit {
  @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
  @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
  @Output() currentBlock: EventEmitter<any> = new EventEmitter();

  @Input() feedDebounce = 0;
  @Input() user: string;

  feed: Observable<any>;
  currentSegment: Observable<any>;
  visible = false;
  initialized = false;

  constructor(private story: StoryService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('fade in: ', this.visible)
      this.visible = true;
    });
  }

  ngOnChanges() {
    this.feed = this.story.getStory().valueChanges().pipe(
      debounceTime(100),
      delayWhen((v) => (this.initialized && last(v) && last(v).type === 'story')
        ? interval(this.feedDebounce)
        : of(undefined)),
      tap(v => {
        console.log('initialized? ', this.initialized)
        this.initialized = true;
      }),
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
