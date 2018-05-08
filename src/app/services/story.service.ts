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
        console.log('get story: ', this.db.list('story'));
        console.log('list: ', this.db.list('story'))
        return this.db.list('story')
    }

    getCurrentSegment(): FirebaseListObservable<any> {
        console.log('list: ', this.db.list('currentSegment'))
        return this.db.list('currentSegment');
    }

    tellStory(block) {
        this.storyBlocks = this.getStory();
        console.log("blocks: ", this.storyBlocks)
        console.log("NEW BLOCK: ", block)
        this.storyBlocks.push(block);
        this.mockType();
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

    interval = char => (char === '*') ? 500 : (Math.random() * 80 + 30);

    mockType() {
        console.log('type')
        if (this.segIndex < this.currentBlock.length) {

            // if (this.currentBlock[this.segIndex][this.charIndex] !== '*') {
            if (this.testBlock[this.segIndex][this.charIndex] !== '*') {
                //  this.currentSegment += this.currentBlock[this.segIndex][this.charIndex];
                this.testBlock += this.currentBlock[this.segIndex][this.charIndex];
                console.log(this.testBlock);
            }

            if (this.charIndex === (this.currentBlock[this.segIndex].length - 1)) {
                // this.lastBlock.push(this.currentSegment);
                // this.currentSegment = '';
                this.lastBlock.push(this.testBlock);
                this.testBlock = '';
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

    setMode() {
        console.log('set mode')
        this.mode = this.story[this.storyIndex].type;
        console.log('mode: ', this.mode);
        if (this.mode === 'story') {
            this.mockType();
        }
    }
}