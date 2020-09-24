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
    isTyping = true;
    mistakePause = false;

    typo = {
      length: 0,
      correcting: false,
      typing: false,
    }

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
        } else if (char === ']') {
           return 200;
        }
        return ((6 - this.speed) * this.speedMuliplier + (Math.round((Math.random() * 10))));
    }

    autoType() {
      if (this.typeString[this.charIndex] === '[') {
        this.typo.typing = true;
      } else if (this.typeString[this.charIndex] === ']') {
        this.mistakePause = true;
        this.typo.typing = false;
        this.typo.correcting = true;
      } else if (!this.typo.correcting) {
        this.stream += this.typeString[this.charIndex];
      }

      if (this.typo.correcting && this.typo.length > 1) {
        this.stream = this.stream.substring(0, this.stream.length - 1);
        this.typo.length--;
      } else if (this.typo.typing) {
        this.typo.length++;
      } else {
        this.typo.correcting = false;
      }

      if (this.charIndex < this.length - 1) {
        setTimeout(() => {
          this.charIndex = (this.typo.correcting) ? this.charIndex : this.charIndex + 1;
          this.autoType();
        }, this.interval(this.typeString[this.charIndex]));
      } else {
        setTimeout(() => {
          this.isTyping = false;
          this.typedSegment.emit(this.stream);
        }, 800);
      }
    }
}
