import { Component, OnInit, OnChanges, EventEmitter, Output, HostBinding, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit, OnChanges {
  chatFeed: FirebaseListObservable<any[]>;

  @Input() user: any;
  @Input() color: string;

  constructor(private chatService: ChatService) { 
  }

  ngOnInit() {
   console.log('init chat feed')
   this.chatFeed = this.chatService.getMessages(this.user.id);
  }

  ngOnChanges() {
   this.chatFeed = this.chatService.getMessages(this.user.id);
  }
}
