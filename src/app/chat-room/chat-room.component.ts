import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewChecked{
  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

}
