import { Component, OnInit } from '@angular/core';
import { STORY } from './story'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { StoryService } from '../services/story.service';

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
  storyMode = false;
  mode = 'chat';
  time = '00:00';
  clock = 0;

  constructor(private storyBlocks: StoryService) { }

  ngOnInit() {
    const block = this.story[this.storyIndex].value;
    this.lastBlock = [];
    this.currentBlock = block.split('/');
    this.storyBlocks.clear();
    this.storyBlocks.tellStory(this.story[this.storyIndex]);;
    this.storyFeed = this.storyBlocks.getStory();
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

  mockType() {
    if (this.segIndex < this.currentBlock.length){

      if (this.currentBlock[this.segIndex][this.charIndex] !== '*') {
      this.currentSegment += this.currentBlock[this.segIndex][this.charIndex];
      }

      if (this.charIndex === (this.currentBlock[this.segIndex].length - 1)){
        console.log('currentSegment: ', this.currentSegment);
        this.lastBlock.push(this.currentSegment);
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
      if (this.mode === 'story'){
        this.mode = 'wait';
      }
    }
  }

  interval(char) {
    return (char === '*') ? 500 : (Math.random() * 80 + 30);
  }

  advanceStory() {
    if (this.clock === 0){
      this.startClock();
    }
    this.segIndex = 0;
    this.storyMode = true;
    this.mode = 'story';
    this.storyIndex += 1;
    this.currentBlock = this.story[this.storyIndex].value.split('/')
    this.storyBlocks.tellStory(this.story[this.storyIndex]);
    this.setMode();
  }

  setMode() {
    console.log("MODE: ", this.story[this.storyIndex].type);
    this.mode = this.story[this.storyIndex].type;
    if (this.mode === 'story'){
      this.mockType();
    }
  }

  submit(input){
    console.log(input.value );
    this.segIndex = 0;
    this.currentBlock = [ input.value ];
    this.mockType();
    input.value = '';
  }
}
