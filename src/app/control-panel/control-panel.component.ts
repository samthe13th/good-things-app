import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { STORY, SHOW } from '../story'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { StoryService } from '../services/story.service';
import { StorySegment } from '../interfaces/story-segment.interface';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('feed') feedWrapper: ElementRef;

  story: any = STORY;
  storyIndex = 0;
  segIndex = 0;
  charIndex = 0;
  storyFeed;
  lastBlock = [];
  currentBlock;
  currentSegment = '';
  segment = '';
  storyMode = false;
  mode = 'start';
  time = '00:00';
  clock = 0;
  user = 'admin'
  clockRunning = false;
  chatUser;

  storyBlocks;
  storySegment; 

  feed: FirebaseListObservable<StorySegment[]>;
  users: FirebaseListObservable<any[]>;
  id = 'admin';

  constructor(
    private authService: AuthService,
     private route: ActivatedRoute,
    private storyService: StoryService,
    private chatService: ChatService) { 
     this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.instantiateClock();
    this.chatUser = SHOW.users[0];
    const block: any = this.story[this.storyIndex].value;
    this.lastBlock = [];
    this.currentBlock = { type: 'story', value: block, canView: 'all' };
    this.storyService.tellStory(this.currentBlock);
    this.storyFeed = this.storyService.getStory();
    this.feed = this.storyService.getStory();
    this.resetUserList()
    setTimeout(() => {
     this.authService.signInAnonymously();
    })
  }

  resetUserList() {
    _.each(SHOW.users, (user) => {
      this.chatService.addUser(user);
    })
    this.users = this.chatService.getUserList();
  }

  reset() {
    if (confirm("This will reset the show and delete all chat conversations. Are you sureeeee you want to do this??")) {
      this.storyService.clear();
      this.clockRunning = false;
      this.clock = 0;
      this.time = '00:00'
      this.lastBlock = [];
      this.storyIndex = 0;
      this.mode = 'start';
      this.chatService.clear();
      this.resetUserList();
    }
    setTimeout(() => {
     this.authService.signInAnonymously();
    })
  }

  ngOnChanges() {
    this.feed = this.storyService.getStory();
    this.users = this.chatService.getUserList();
  }

  filterChat(user) {
    if (this.chatUser){
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
      }
    }, 1000);
  }

  updateTime(clock) {
    this.time = `${this.twoDigitFormat(Math.floor(clock / 60))}:${this.twoDigitFormat(clock % 60)}`;
  }

  twoDigitFormat(number) {
    return (number > 9) ? String(number) : `0${String(number)}`;
  }

  autoTypeBlock() {
    if (this.segIndex < this.currentBlock.length) {
      this.storyService.updateCurrentSegment({ type: 'story', value: this.currentBlock});
      this.segment = this.currentBlock;
    }
  }

  interval(char) {
    return (char === '*') ? 400 : (Math.random() * 60 + 20);
  }

  advanceStory() {
    this.feed = this.storyService.getStory();
    if (!this.clockRunning) {
      this.clockRunning = true;
    }
    this.segIndex = 0;
    this.storyMode = true;
    this.mode = 'story';
    this.storyIndex += 1;
    this.currentBlock = this.story[this.storyIndex];
    this.setMode();

    this.storyBlocks = this.storyService.getStory();
    this.storySegment = this.storyBlocks.push();
    this.storyService.tellStory(this.currentBlock);
    this.autoTypeBlock();
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
      this.mode = 'wait';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.feedWrapper.nativeElement.scrollTop = this.feedWrapper.nativeElement.scrollHeight;
  }
}
