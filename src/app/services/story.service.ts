import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class StoryService {
    storyBlocks;
    constructor(private db: AngularFireDatabase) { }

    getStory(): FirebaseListObservable<any> {
        return this.db.list('story');
    }

    tellStory(block) {
        console.log('tell story: ', block)
        this.storyBlocks = this.getStory();
        this.storyBlocks.push(block);
    }

    clear() {
        this.db.list('story').remove();
    }
}