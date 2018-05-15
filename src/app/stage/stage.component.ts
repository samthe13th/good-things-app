import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { StorySegment } from '../interfaces/story-segment.interface';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller: ElementRef;

  id; 

  currentSegment = 'test';
  constructor(private authService: AuthService, private route: ActivatedRoute, private chatService: ChatService) { 
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
     this.authService.signInAnonymously();
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

  submit(message) {
    this.chatService.sendMessage(message.value, this.id);
  }
}
