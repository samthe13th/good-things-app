import { Component, OnInit, OnChanges, EventEmitter, Output, HostBinding, Input } from '@angular/core';
import { StoryService } from '../services/story.service';
import { Observable } from 'rxjs/Observable';
import { StorySegment } from '../interfaces/story-segment.interface';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  @Output() advanceScroll: EventEmitter<boolean> = new EventEmitter();
  @Output() finishedTyping: EventEmitter<boolean> = new EventEmitter();
  @Output() currentBlock: EventEmitter<any> = new EventEmitter();

  @Input() user: string;

  feed: FirebaseListObservable<StorySegment[]>;
  currentSegment:  FirebaseListObservable<StorySegment[]>;

  constructor(private story: StoryService) { }

  ngOnInit() {
   this.feed = this.story.getStory();
   this.currentSegment = this.story.getCurrentSegment();
  }

  ngOnChanges() {
    this.feed = this.story.getStory();
    this.currentSegment = this.story.getCurrentSegment();
  }

  onFinishTyping(boolean){
    this.finishedTyping.emit(boolean);
  }

  onAdvanceScroll(boolean) {
    this.advanceScroll.emit(boolean);
  }

  onCurrentBlockChange(block) {
    this.currentBlock.emit(block)
  }
}
