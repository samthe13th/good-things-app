import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { StoryService } from '../services/story.service';
import { StorySegment } from '../interfaces/story-segment.interface';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller: ElementRef;
  currentSegment:  FirebaseListObservable<StorySegment[]>;
  currentBlock: any;
  id; 

  constructor(private authService: AuthService, private route: ActivatedRoute, private chatService: ChatService, private story: StoryService) { 
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    setTimeout(() => {
     this.authService.signInAnonymously();
    })
       this.currentSegment = this.story.getCurrentSegment();
  }

  ngOnChanges() {
     this.currentSegment = this.story.getCurrentSegment();
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
    this.scrollToBottom();
  }

  submit(input) {
    this.chatService.sendMessage(input.value, this.id, this.id);
    this.story.tellStory({
      isPrivate: true,
      value: input.value,
      type: 'chat',
      canView: this.id,
    })
    input.value = '';
  }

  onCurrentBlockChange(block) {
    this.currentBlock = block
  }
}
