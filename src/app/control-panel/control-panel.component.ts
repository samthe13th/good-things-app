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

  storyBlocks;
  storySegment; 

  feed: FirebaseListObservable<StorySegment[]>;

  constructor(private storyService: StoryService) { }

  ngOnInit() {
    const block = this.story[this.storyIndex].value;
    this.lastBlock = [];
    this.currentBlock = { type: 'story', value: block };
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

  /*
  mockType() {
    if (this.segIndex < this.currentBlock.length){

      this.segment = this.currentBlock[this.segIndex];

      if (this.currentBlock[this.segIndex][this.charIndex] !== '*') {
        this.currentSegment += this.currentBlock[this.segIndex][this.charIndex];
      }

      if (this.charIndex === (this.currentBlock[this.segIndex].length - 1)) {
        console.log('currentSegment: ', this.currentSegment);
        // this.lastBlock.push(this.currentSegment);
        this.currentSegment = '';
        this.charIndex = 0;
        this.segIndex++;
        setTimeout(() => {
         this.mockType();
        }, 1000)
      } else {
        setTimeout(() => {
          if (this.charIndex < (this.currentBlock[this.segIndex].length - 1)) {
            this.charIndex += 1;
            this.mockType();
          }
        }, this.interval(this.currentBlock[this.segIndex][this.charIndex]));
      }
    } else {
      console.log("end of block");
      this.lastBlock.push('---');
      this.storyMode = false;
      if (this.mode === 'story') {
        this.mode = 'wait';
      }
    }
  }
  */
  
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
    this.currentBlock = { type: 'story', value: this.story[this.storyIndex].value };
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
    /*
      if (this.mode === 'story') {
        this.mockType();
      }
    */
  }

  submit(input){
    console.log(input.value );
    this.segIndex = 0;
    this.currentBlock = [input.value];
    this.autoTypeBlock();
    input.value = '';
  }

  onFinishTyping(segment) {
    console.log('END OF TYPING')
    //this.segment = '';
    //this.lastBlock.push(segment);
    this.mode = 'wait';
  //  this.storyService.tellStory({ type: 'story', value: segment});
  /*
    this.segIndex += 1;
    this.mode === 'wait';
    if (segment === this.currentBlock[this.currentBlock.length - 1]) {
      this.lastBlock.push('---')
      this.mode = 'wait';
    }
    setTimeout(() => {
      this.autoTypeBlock();
    }, 1000)
    */
  }
}
