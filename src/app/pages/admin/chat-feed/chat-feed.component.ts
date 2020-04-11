import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit, OnChanges {
  chatFeed: Observable<any>;

  @Input() user: any;
  @Input() color: string;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
   this.chatFeed = this.chatService.getMessages(this.user.id).valueChanges();
  }

  ngOnChanges() {
   this.chatFeed = this.chatService.getMessages(this.user.id).valueChanges();
  }
}
