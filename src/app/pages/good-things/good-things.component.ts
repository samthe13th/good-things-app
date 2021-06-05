import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'good-things',
  template: `
  <h1>Good Things</h1>
  <div *ngIf="goodthings | async as things" class="goodthings-card">
    <div *ngFor="let thing of things" class="thing">{{thing}}</div>
  </div>
  `,
  styleUrls: ['./good-things.component.css'],
  host: {
    'class': 'good-things'
  }
})
export class GoodThingsComponent implements OnInit {
  goodthings: Observable<any>;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.authService.signInAnonymously();
      this.goodthings = this.chatService.getMasterList();
    });
  }
}
