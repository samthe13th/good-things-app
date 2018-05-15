import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { STORY } from '../story'
import * as firebase from 'firebase/app';
import * as _ from 'lodash';

@Injectable()
export class StoryService {
    story = STORY;
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

    $segment; 

    constructor(private db: AngularFireDatabase) { }

    ngOnInit() {
        const block = this.story[this.storyIndex].value;
        this.lastBlock = [];
        this.currentBlock = block.split('/');
    }

    getStory(): FirebaseListObservable<any> {
        return this.db.list('story')
    }

    getCurrentSegment(): FirebaseListObservable<any> {
        return this.db.list('currentSegment');
    }

    tellStory(block) {
        this.storyBlocks = this.getStory();
        this.storyBlocks.push(block);
    }

    chat(message) {
        this.storyBlocks = this.getStory();
        this.storyBlocks.push(message);
    }

    clear() {
        this.db.list('story').remove();
    }

    updateCurrentSegment(segment) {
        const segment$ = this.db.object('currentSegment')
        segment$.set(segment);
    }

    updateTime(clock) {
        this.time = `${this.twoDigitFormat(Math.floor(clock / 60))}:${this.twoDigitFormat(clock % 60)}`;
    }

    twoDigitFormat = number => (number > 9) ? String(number) : `0${String(number)}`;
}