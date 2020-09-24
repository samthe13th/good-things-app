import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { take } from 'rxjs/operators';

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
        <th>Moderate</th>
      </tr>

      <tr *ngFor="let user of users | async" [class.blacklisted]="user?.blacklistId">
        <td>{{ user.id }}</td>
        <td>{{ user.canHear || '...' }}</td>
        <td>{{ user.chatWorks ? 'yes' : '...' }}</td>
        <td>
          <span *ngIf="user.delayConfigured">{{ user.delay }}</span>
          <span *ngIf="!user.delayConfigured">...</span>
        </td>
        <td><button (click)="setDefaultDelay(user.id)">Set to 12</button></td>
        <td><button (click)="clearDelay(user.id)">Clear</button></td>
        <td>
          <button *ngIf="user?.blacklistId" (click)="reAdmitUser(user.id)">Re-Admit User</button>
          <button *ngIf="user?.blacklistId === undefined" (click)="ejectUser(user.id)">Eject User</button>
        </td>
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
    this.db.object(`users/${id}/delay`).set(0);
    this.db.object(`users/${id}/delayConfigured`).set(true);
  }

  clearDelay(id) {
    this.db.object(`users/${id}/delay`).set(0);
    this.db.object(`users/${id}/delayConfigured`).set(false);
  }

  ejectUser(id) {
    if (confirm('Eject this user from the show and blacklist their show-code?')) {
      this.db.list('blacklist').push(id).then((value) => {
        console.log('callback: ', value);
        this.db.object(`users/${id}/blacklistId`).set(value.key);
      });
    }
  }

  reAdmitUser(id) {
    if (confirm('Re-admit this user to the show?')) {
      this.db.object(`users/${id}/blacklistId`)
        .valueChanges()
        .pipe(take(1))
        .subscribe((value) => {
          this.db.object(`blacklist/${value}`).remove();
          this.db.object(`users/${id}/blacklistId`).remove();
          console.log(value);
        });
    }
  }
}
