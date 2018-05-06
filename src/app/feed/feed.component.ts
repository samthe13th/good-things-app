import { Component, OnInit, OnChanges } from '@angular/core';
import { StoryService } from '../services/story.service';
import { Observable } from 'rxjs/Observable';
import { StorySegment } from '../interfaces/story-segment.interface';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: FirebaseListObservable<StorySegment[]>;

  constructor(
    private story: StoryService
  ) { }

  ngOnInit() {
   // this.feed = this.chat.getMessages();
   this.feed = this.story.getStory();
  }

  ngOnChanges() {
    this.feed = this.story.getStory();
  }
}
