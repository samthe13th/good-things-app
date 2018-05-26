import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { STORY, SHOW } from '../../story'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { StoryService } from '../../services/story.service';
import { StorySegment } from '../../interfaces/story-segment.interface';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('feed') feedWrapper: ElementRef;

  story: any = STORY;
  storyIndex = 0;
  segIndex = 0;
  charIndex = 0;
  storyFeed;
  currentBlock;
  currentSegment = '';
  segment = '';
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
    this.chatUser = SHOW.users[0];
    this.storyFeed = this.storyService.getStory();
    this.feed = this.storyService.getStory();
    this.currentBlock = this.story[0]
    this.resetUserList()
    this.storyService.getIndex().take(1).subscribe((index) => {
      this.storyIndex = index.$value;
      this.currentBlock = this.story[this.storyIndex];
      this.mode = this.currentBlock.type;
    })
    this.storyService.getClock().take(1).subscribe((clock) => {
      if (clock.$value > 0) {
        this.clock = clock.$value;
        this.clockRunning = true;
      }
    this.instantiateClock();
    })
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
      this.storyService.updateClock(0);
      this.time = '00:00'
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

  autoTypeBlock() {
    if (this.segIndex < this.currentBlock.length) {
      this.storyService.updateCurrentSegment({ type: 'story', value: this.currentBlock});
      this.segment = this.currentBlock;
    }
  }

  advanceStory(n) {
    console.log('advance... ')
    this.feed = this.storyService.getStory();
    if (!this.clockRunning) {
      this.clockRunning = true;
    }
    this.segIndex = 0;
    console.log('index: ', this.storyIndex);
    this.storyIndex += n;
    console.log('index: ', this.storyIndex);
    this.mode = this.story[this.storyIndex].type;

    this.storyService.updateIndex(this.storyIndex);
    this.storyService.updateBlockType(this.mode);
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
      console.log('next: ', this.story[this.storyIndex + 1].type)
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
