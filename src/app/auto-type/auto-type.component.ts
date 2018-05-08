import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { StoryService } from '../services/story.service';
import { Observable } from 'rxjs/Observable';
import { StorySegment } from '../interfaces/story-segment.interface';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'auto-type',
  template: `
    {{ stream }}<span class="cursor">|</span>
  `,
  styleUrls: ['./auto-type.component.css']
})
export class AutoTypeComponent implements OnInit, OnChanges {
    charIndex = 0;
    length = 0;
    stream = '';
    currentSegment: FirebaseObjectObservable<any>;

    @Output() typedSegment: EventEmitter<string> = new EventEmitter();

    @Input()
    set typeString(value) {
        this.stream = '';
        this.charIndex = 0;
        this._typeString = value;
        this.length = value.length;
        if (value !== ''){
        this.autoType();
        }
    }
    get typeString() {
        return this._typeString;
    }
    private _typeString: string;

    constructor(private story: StoryService){}

    ngOnInit() {
        console.log('current segment: ', this.currentSegment)
    }

    ngOnChanges() {
        console.log('current segment: ', this.currentSegment)
    }

    interval = char => (char === '*') ? 500 : (Math.random() * 80 + 20);

    autoType() {
        if (this.typeString[this.charIndex] !== '*') {
            console.log('length: ', this.typeString.length);
            this.stream += this.typeString[this.charIndex];
            console.log('stream: ', this.stream)
        }
    
        if (this.charIndex < this.length - 1) {
            setTimeout(() => {
                this.charIndex += 1;
                this.autoType();
            }, this.interval(this.typeString[this.charIndex]));
        } else {
            setTimeout(() => {
                this.typedSegment.emit(this.stream);
            }, 800)
        }
    }
}
