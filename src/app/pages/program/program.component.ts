import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
  host: {
    'class': 'program'
  }
})
export class ProgramComponent implements OnInit {
  goodthings: Observable<any>;
  section = 'about';

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.authService.signInAnonymously();
      this.goodthings = this.chatService.getMasterList();
    });
  }

  select(section) {
    this.section = section;
  }

}
