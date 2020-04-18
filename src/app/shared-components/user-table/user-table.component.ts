import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'user-table',
  template: `
    <table>
      <tr>
        <th>User</th>
        <th>Hears audio</th>
        <th>Chat works</th>
        <th>Delay</th>
        <th>Set default delay</th>
        <th>Clear delay</th>
      </tr>
      <tr *ngFor="let user of users | async">
        <td>{{ user.id }}</td>
        <td>{{ user.canHear || '...' }}</td>
        <td>{{ user.chatWorks ? 'yes' : '...' }}</td>
        <td>
          <span *ngIf="user.delayConfigured">{{ user.delay }}</span>
          <span *ngIf="!user.delayConfigured">...</span>
        </td>
        <td><button (click)="setDefaultDelay(user.id)">Set to 12</button></td>
        <td><button (click)="clearDelay(user.id)">Clear</button></td>
      </tr>
    </table>
  `,
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  users: Observable<any[]> = this.chatService.getUserList().valueChanges();

  constructor(
    private db: AngularFireDatabase,
    private chatService: ChatService) {
  }

  setDefaultDelay(id) {
    this.db.object(`users/${id}/delay`).set(12);
    this.db.object(`users/${id}/delayConfigured`).set(true);
  }

  clearDelay(id) {
    this.db.object(`users/${id}/delay`).set(0);
    this.db.object(`users/${id}/delayConfigured`).set(false);
  }
}
