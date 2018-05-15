import { Component, OnInit } from '@angular/core';
import { STORY } from '../story'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { StoryService } from '../services/story.service';
import { StorySegment } from '../interfaces/story-segment.interface';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  story = STORY;
  storyIndex = 0;
  segIndex = 0;
  charIndex = 0;
  storyFeed;
  lastBlock = [];
  currentBlock;
  currentSegment = '';
  segment = '';
  storyMode = false;
  mode = 'chat';
  time = '00:00';
  clock = 0;
  user = 'admin'

  storyBlocks;
  storySegment; 

  feed: FirebaseListObservable<StorySegment[]>;

  constructor(private storyService: StoryService) { }

  ngOnInit() {
    const block = this.story[this.storyIndex].value;
    this.lastBlock = [];
    this.currentBlock = { type: 'story', value: block, canView: 'all' };
    this.storyService.clear();
    this.storyService.tellStory(this.currentBlock);;
    this.storyFeed = this.storyService.getStory();
    this.feed = this.storyService.getStory();
  }


  ngOnChanges() {
    console.log('change');
    this.feed = this.storyService.getStory();
  }

  startClock() {
    setInterval(() => {
      this.clock++;
      this.updateTime(this.clock);
    }, 1000);
  }

  updateTime(clock) {
    this.time = `${this.twoDigitFormat(Math.floor(clock / 60))}:${this.twoDigitFormat(clock % 60)}`;
  }

  twoDigitFormat(number) {
    return (number > 9) ? String(number) : `0${String(number)}`;
  }

  autoTypeBlock() {
    if (this.segIndex < this.currentBlock.length) {
      this.storyService.updateCurrentSegment({ type: 'story', value: this.currentBlock});
      this.segment = this.currentBlock;
    }
  }

  interval(char) {
    return (char === '*') ? 500 : (Math.random() * 80 + 30);
  }

  advanceStory() {
    this.feed = this.storyService.getStory();
    console.log('advance')
    if (this.clock === 0) {
      this.startClock();
    }
    this.segIndex = 0;
    this.storyMode = true;
    this.mode = 'story';
    this.storyIndex += 1;
    this.currentBlock = this.story[this.storyIndex];
    this.setMode();

    this.storyBlocks = this.storyService.getStory();
    this.storySegment = this.storyBlocks.push();
    this.storyService.tellStory(this.currentBlock);

    console.log('current block: ', this.currentBlock);
    this.autoTypeBlock();
  }

  setMode() {
    console.log("MODE: ", this.story[this.storyIndex].type);
    this.mode = this.story[this.storyIndex].type;
  }

  submit(input){
    console.log('submit: ', input.value );
    console.log('current: ', this.currentBlock);
    this.storyService.chat({ ...this.currentBlock, value: input.value, canView: '4', user: this.user });
  }

  onFinishTyping(segment) {
    if (this.mode !== 'chat') {
      this.mode = 'wait';
    }
  }
}
