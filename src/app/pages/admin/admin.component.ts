import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { STORY, SHOW } from '../../story'
import { StoryService } from '../../services/story.service';
import { StorySegment } from '../../interfaces/story-segment.interface';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalComponent } from '../../shared-components/modal/modal.component';

@Component({
  selector: 'app-admin',
  template: `    
<div class="admin">
  <div class="top-bar">
    <div class="controls">
      <div class="position">
        <div class="clock">{{ time }}</div>
        <div class="tally">{{ storyIndex }}/{{ story.length - 1}}</div>
      </div>
      <div style="display: flex; flex-direction: row; height: 60px">
        <button class="advance-btn" (click)="reset()">RESET</button>
        <button class="advance-btn" [disabled]="mode === 'story'" (click)="advanceStory(1)">
          <span *ngIf="clock === 0">START</span>
          <span *ngIf="clock !== 0">NEXT</span>
        </button>
      </div>
    </div>
    <div class="admin__timeline">
      <div class="admin__story-block" *ngFor="let n of story; let i = index" [ngClass]="{
        'admin__story-block--select': (storyIndex === i),
        'admin__story-block--read': (storyIndex > i)
        }">
        <div class="block-number" *ngIf="i > 0">{{ i }}</div>
        <img *ngIf="n.type === 'start'" src="../../assets/icons/start-icon.png">
        <img *ngIf="n.type === 'story'" src="../../assets/icons/book-icon.png">
        <img *ngIf="n.type === 'chat'" src="../../assets/icons/chat-icon.png">
      </div>
    </div>
  </div>

  <div class="admin__main">
    <div class="admin__chat-panel">
      <div *ngIf="!chatUser">Waiting for users....</div>
      <div class="admin__chat-panel-main" *ngIf="chatUser" >

        <div class="admin__chat-panel-feed" *ngIf="users | async" >
          <div *ngFor="let user of users | async; let i = index" style="position: relative">
            <button
              style="width: 40px; height: 40px; font-size: 16px; cursor: pointer"
              [style.background]="chatUser.id === user.id ? user.color : 'white'"
              (click)="filterChat(user)">
              {{ i + 1 }}
            </button>
            <div *ngIf="user.unread === true && chatUser.id !== user.id"
              [style.background]="user.color"
              class="user-badge">!</div>
          </div>
        </div>
        
        <chat-feed class="chat-feed" [user]="chatUser"></chat-feed>
      </div>

      <div *ngIf="chatUser" (keyup.enter)="chat(chatInput)" class="admin__feedback"
        [style.marginBottom.px]="currentBlock.type !== 'chat' ? -120 : 0" >
        <input #chatInput class="admin__feedback-input">
        <button [disabled]="mode !== 'chat'" class="admin__feedback-btn" (click)="chat(chatInput)">SEND</button>
      </div>

    </div>

    <div class="admin__stage-wrapper">
      <div style="font-size: 16px; padding: 10px; background: #ededed; height: 38px; box-sizing: border-box">
        <button (click)="advanceStory(1)" [style.margin-right.px]="20">Force Advance</button>
        <button (click)="configDelay()" [style.margin-right.px]="20">Config Delay</button>
        <button (click)="openThemeModal()" [style.margin-right.px]="20">Theme</button>
        <span *ngIf="mode === 'start'">Press start to begin show</span>
        <span *ngIf="mode === 'story'">Autotyping story block...</span>
        <span *ngIf="mode === 'wait'">Paused. Click "NEXT" to advance.</span>
        <span *ngIf="mode === 'chat'">Chat Mode</span>
      </div>
      <div class="admin__stage" #feed>
        <feed [user]='user' (finishedTyping)="onFinishTyping($event)"></feed>
      </div>
    </div>

  </div>
</div>
<modal title="Change theme" (actionEvent)="updateTheme()" #themeModal>
  <div 
    *ngFor="let _theme of themes"
    (click)="selectTheme(_theme)"
    class="admin-theme"
    [class.selected]="_theme.name === pendingTheme"
    [style.background]="_theme.background"
    [style.color]="_theme.color"
  >
    {{ _theme.name }}
  </div>
</modal>
`,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnChanges {
  @ViewChild('chatInput') chatInput: ElementRef;
  @ViewChild('feed') feedWrapper: ElementRef;
  @ViewChild('themeModal') themeModal: ModalComponent;

  story: any = STORY;
  storyIndex = 0;
  segIndex = 0;
  storyFeed;
  currentBlock;
  segment = '';
  mode = 'start';
  isPrivate = true;
  time = '00:00';
  clock = 0;
  user = 'admin';
  clockRunning = false;

  chatUser;
  storyBlocks;
  storySegment;

  feed: Observable<any>;
  users: Observable<any[]>;

  id = 'admin';

  themes = SHOW.themes;
  currentTheme = 'light';
  pendingTheme = 'light';

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private route: ActivatedRoute,
    private storyService: StoryService,
    private chatService: ChatService) {
     this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    console.log('admin: ', this.story)
    this.resetUserList();
    this.users.subscribe((users) => {
      if (users.length > 0 && !this.chatUser) {
        this.chatUser = users[0];
      }
    });
    this.storyFeed = this.storyService.getStory();
    this.feed = this.storyService.getStory().valueChanges();
    this.currentBlock = this.story[0];
    this.storyService.getIndex().valueChanges().subscribe((index: any) => {
      this.storyIndex = index;
      this.currentBlock = this.story[this.storyIndex];
      this.mode = this.currentBlock.type;
    });
    this.storyService.getClock().valueChanges().pipe(
      take(1)
    ).subscribe((clock: any) => {
      if (clock > 0) {
        this.clock = clock;
        this.clockRunning = true;
      }
      this.instantiateClock();
    });
    setTimeout(() => {
     this.authService.signInAnonymously();
    });
  }

  resetUserList() {
    this.users = this.chatService.getUserList().valueChanges();
  }

  configDelay() {
    this.storyService.getClock().valueChanges().pipe(take(1)).subscribe((value) => {
      this.db.object('configDelayStartTime').set(value)
    });
  }

  reset() {
    if (confirm("This will reset the show and delete all chat conversations. Are you sureeeee you want to do this??")) {
      this.storyService.clear();
      this.clockRunning = false;
      this.clock = 0;
      this.storyService.updateClock(0);
      this.time = '00:00';
      this.storyIndex = 0;
      this.storyService.updateIndex(this.storyIndex);
      this.mode = 'start';
      this.chatService.clear();
      this.resetUserList();
      this.db.object('showStarted').set(false);
      this.db.object('theme').set('light');
      this.currentBlock = this.story[this.storyIndex];
      this.storyService.tellStory(this.currentBlock);
      this.autoTypeBlock();
    }
    setTimeout(() => {
     this.authService.signInAnonymously();
    });
  }

  ngOnChanges() {
    this.feed = this.storyService.getStory().valueChanges();
    this.users = this.chatService.getUserList().valueChanges();
  }

  openThemeModal() {
    this.themeModal.open();
  }

  filterChat(user) {
    this.chatInput.nativeElement.focus();
    if (this.chatUser) {
      this.chatService.setUnreads(this.chatUser.id, false);
    }
    this.chatUser = user;
    this.chatService.setUnreads(user.id, false);
  }

  instantiateClock() {
    setInterval(() => {
      if (this.clockRunning){
        this.clock++;
        this.updateTime(this.clock);
        this.storyService.updateClock(this.clock);
      }
    }, 1000);
  }

  updateTime(clock) {
    this.time = `${this.twoDigitFormat(Math.floor(clock / 60))}:${this.twoDigitFormat(clock % 60)}`;
  }

  twoDigitFormat(number) {
    return (number > 9) ? String(number) : `0${String(number)}`;
  }

  updateTheme() {
    console.log('update theme');
    this.db.object('theme').set(this.pendingTheme);
  }

  selectTheme(theme) {
    console.log('select: ', theme);
    this.pendingTheme = theme.name;
  }

  autoTypeBlock() {
    console.log('AUTOTYPE')
    if (this.segIndex < this.currentBlock.length) {
      console.log('autotype ', this.currentBlock)
      this.storyService.updateCurrentSegment({ type: 'story', value: this.currentBlock});
      this.segment = this.currentBlock;
    }
  }

  advanceStory(n) {
    console.log('advance.. ', n)
    console.log('clock: ', this.storyService.getClock());

    this.feed = this.storyService.getStory().valueChanges();
    if (!this.clockRunning) {
      this.clockRunning = true;
    }
    this.segIndex = 0;
    this.storyIndex += n;
    this.mode = this.story[this.storyIndex].type;
    this.isPrivate = this.story[this.storyIndex].isPrivate ? this.story[this.storyIndex].isPrivate : true;

    this.storyService.updateIndex(this.storyIndex);
    this.storyService.updateBlockType(this.mode);
    this.storyService.updatePrivacy(this.story[this.storyIndex].isPrivate );
    this.currentBlock = this.story[this.storyIndex];
    this.setMode();

    this.storyBlocks = this.storyService.getStory();
    this.storySegment = this.storyBlocks.push();
    if (this.currentBlock.type === 'story') {
      this.storyService.tellStory(this.currentBlock);
      this.autoTypeBlock();
    }
    this.db.object('showStarted').set(true)
  }

  setMode() {
    this.mode = this.story[this.storyIndex].type;
  }

  submit(input){
    this.storyService.tellStory({ ...this.currentBlock, type: 'chat', isPrivate: false, value: input.value, user: this.user });
    input.value = '';
  }

  chat(input) {
    this.chatService.sendMessage(input.value, this.chatUser.id, 'admin');
    this.storyService.tellStory({
      isPrivate: true,
      value: input.value,
      type: 'chat',
      canView: this.chatUser.id,
      user: 'admin',
    })
    input.value = '';
  }

  onFinishTyping(segment) {
    if (this.mode !== 'chat') {
      if (this.story[this.storyIndex + 1] && this.story[this.storyIndex + 1].type === 'chat'){
        this.advanceStory(1);
      } else {
        this.mode = 'wait';
      }
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.feedWrapper.nativeElement.scrollTop = this.feedWrapper.nativeElement.scrollHeight;
  }
}
