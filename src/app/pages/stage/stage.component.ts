import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { StoryService } from '../../services/story.service';
import { SHOW } from '../../story';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { debounceTime } from 'rxjs/internal/operators';
import { take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css'],
  host: {
    '(keydown)': 'onKeyDown($event)'
  }
})
export class StageComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('scroller') scroller: ElementRef;
  @ViewChild('input') chatInput: ElementRef;

  currentSegment: Observable<any>;
  currentBlock: any;
  id;
  mode;
  isPrivate;
  debounceTime = 10000;
  setupMode = true;
  colors = [];
  delay;
  landing = true;
  theme = 'light';
  showRamp = true;

  constructor (
    private db: AngularFireDatabase,
    private authService: AuthService,
    private chatService: ChatService,
    private story: StoryService ) {
    this.story.getBlockType()
      .valueChanges()
      .pipe(debounceTime(this.debounceTime))
      .subscribe((mode) => {
      this.mode = mode;
    });
    this.story.getPrivacy()
      .valueChanges()
      .pipe(debounceTime(this.debounceTime))
      .subscribe((privacy) => {
        this.isPrivate = privacy;
    });
    this.story.getBlockType()
      .valueChanges()
      .pipe(debounceTime(this.debounceTime))
      .subscribe((type) => {
        if (type === 'chat') {
          console.log('focus chat');
          setTimeout(() => {
            this.chatInput.nativeElement.focus();
          });
        }
      });

    this.db.object('theme')
      .valueChanges()
      .subscribe((value) => {
        this.showRamp = false;
        setTimeout(() => {
          this.theme = value;
          this.showRamp = true;
        }, 2000);
      });
  }

  ngOnInit() {
  }

  onKeyDown(event) {
    console.log('key down')
  }

  initUser() {
    setTimeout(() => {
      this.authService.signInAnonymously();
      console.log('add user... ', this.id)
      this.chatService.addUser({
        id: this.id,
        color: SHOW.users[_.toNumber(this.id.slice(0, 2))].color,
        unread: false
      });
    });
    this.currentSegment = this.story.getCurrentSegment();
  }

  enterCode(code) {
    this.db.object('showCodes').valueChanges()
      .pipe(take(1))
      .subscribe((codes) => {
        console.log(codes, this.landing, this.id)
        if (_.includes(codes, code)) {
          this.landing = false;
          this.id = code;
          this.initUser();
        }
      });
  }

  ngOnChanges() {
    this.scrollToBottom();
    this.currentSegment = this.story.getCurrentSegment();
  }

  configDelay() {
    this.db.object('timeline/clock').valueChanges()
      .pipe(take(1))
      .subscribe((value) => {
       const time = value;
       this.db.object('configDelayStartTime').valueChanges().pipe(take(1)).subscribe((start) => {
         this.delay = _.toNumber(time) - _.toNumber(start);
         this.db.object(`users/${this.id}`).update({delay: this.delay});
         this.debounceTime = this.delay * 1000;
       });
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  onFinishTyping(segment) {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
  }

  onAdvanceScroll(boolean) {
    if (!this.setupMode) {
      this.scrollToBottom();
    }
  }

  submit(input) {
    this.chatInput.nativeElement.focus();
    this.chatService.sendMessage(input.value, this.id, this.id);
    this.story.tellStory({
      isPrivate: this.isPrivate,
      value: input.value,
      type: 'chat',
      canView: this.id,
      user: this.id,
      color: SHOW.users[parseInt(this.id, 10) - 1].color,
    });
    input.value = '';
  }

  onCurrentBlockChange(block) {
    this.currentBlock = block;
    this.scrollToBottom();
  }
}
