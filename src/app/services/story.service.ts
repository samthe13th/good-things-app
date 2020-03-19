import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import { STORY } from '../story';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class StoryService {
  story: any = STORY;
  storyIndex = 0;
  segIndex = 0;
  charIndex = 0;
  storyFeed;
  lastBlock = [];
  currentBlock = [];
  currentSegment = '';
  storyMode = false;
  mode = 'chat';
  time = '00:00';
  clock = 0;

  storyBlocks;
  storySegment;

  testBlock = '';

  constructor(private db: AngularFireDatabase) {
    const block = this.story[this.storyIndex].value;
    this.lastBlock = [];
    this.currentBlock = block.split('/');
  }

  getStory() {
    return this.db.list('story');
  }

  getCurrentSegment(): Observable<any> {
    return this.db.list('currentSegment').valueChanges();
  }

  tellStory(block) {
    this.storyBlocks = this.getStory();
    this.storyBlocks.push(block);
  }

  updateIndex(i) {
    const index = this.getIndex();
    index.set(i);
  }

  getIndex() {
    return this.db.object('timeline/index');
  }

  getBlockType() {
    return this.db.object('timeline/blockType');
  }

  updateBlockType(type) {
    const blockType = this.getBlockType();
    blockType.set(type);
  }

  getPrivacy() {
    return this.db.object('timeline/isPrivate');
  }

  updatePrivacy(_boolean) {
    console.log('update isPrivate: ', _boolean)
    const isPrivate = this.getPrivacy();
    let boolean = true;
    if (_boolean !== undefined){
        boolean = _boolean
    }
    isPrivate.set(boolean);
  }

  getClock() {
    return this.db.object('timeline/clock');
  }

  updateClock(time) {
    const clock = this.getClock();
    clock.set(time);
  }

  chat(message) {
    this.storyBlocks = this.getStory();
    this.storyBlocks.push(message);
  }

  clear() {
    this.db.list('story').remove();
  }

  updateCurrentSegment(segment) {
    console.log('update ', segment)
    const segment$ = this.db.object('currentSegment')
    segment$.set(segment);
  }

  updateTime(clock) {
    this.time = `${this.twoDigitFormat(Math.floor(clock / 60))}:${this.twoDigitFormat(clock % 60)}`;
  }

  twoDigitFormat = number => (number > 9) ? String(number) : `0${String(number)}`;
}
