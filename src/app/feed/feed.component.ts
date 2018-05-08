import { Component, OnInit, OnChanges } from '@angular/core';
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

  feed: FirebaseListObservable<StorySegment[]>;
  currentSegment:  FirebaseListObservable<StorySegment[]>;

  constructor(private story: StoryService) { 
    console.log('construct')
   // this.currentSegment = db.object('currentSegment').valueChanges();
  }

  ngOnInit() {
   console.log('init')
   this.feed = this.story.getStory();
   this.currentSegment = this.story.getCurrentSegment();
  }

  ngOnChanges() {
    console.log('change');
    this.feed = this.story.getStory();
    this.currentSegment = this.story.getCurrentSegment();
  }
}
