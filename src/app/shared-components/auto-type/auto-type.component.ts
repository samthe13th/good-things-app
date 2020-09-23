import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'auto-type',
  template: `
    <span *ngFor="let segment of segments">{{ segment.value }}</span>
    {{ stream }}
  `,
  styleUrls: ['./auto-type.component.css']
})
export class AutoTypeComponent {
    charIndex = 0;
    length = 0;
    stream = '';
    segments = [];
    speedMuliplier = 30;

    @Output() typedSegment: EventEmitter<string> = new EventEmitter();

    @Input()
    set typeString(value) {
        this.stream = '';
        this.charIndex = 0;
        this._typeString = value;
        this.length = value.length;
        if (value !== '') {
          this.autoType();
        }
    }
    get typeString() {
      return this._typeString;
    }
    private _typeString: string;

    @Input() speed = 3;

    interval(char) {
        if (char === '.' || char === '?' || char === '!') {
            return 800;
        } else if (char === '-') {
            return 800;
        } else if (char === ',') {
            return 400;
        }
        return ((6 - this.speed) * this.speedMuliplier + (Math.round((Math.random() * 10))));
    }

    autoType() {
        if (this.typeString[this.charIndex] !== '*') {
            this.stream += this.typeString[this.charIndex];
        } else {
            console.log('FOUND CHAR: *');
        }

        if (this.charIndex < this.length - 1) {
            setTimeout(() => {
               this.charIndex += 1;
               this.autoType();
            }, this.interval(this.typeString[this.charIndex]));
        } else {
            setTimeout(() => {
                this.typedSegment.emit(this.stream);
            }, 800);
        }
    }
}
