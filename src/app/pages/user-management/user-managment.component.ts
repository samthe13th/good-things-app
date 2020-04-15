import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'user-management',
  template: `
    <div style="font-family: sans-serif; padding: 40px; max-width: 800px; margin: auto">
      <div>
        <h2>Users</h2>
        <user-table></user-table>
      </div>
      <br/>
      <div>
        <h2>Good Things</h2>
        <button (click)="clearList()">Clear List</button>
        <p style="font-size: 18px" *ngFor="let thing of goodthings | async">{{ thing }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./user-management.component.css'],
  host: {
    '[class.user-management]': 'true'
  }
})
export class UserManagementComponent {
  constructor(private db: AngularFireDatabase) {
  }

  goodthings = this.db.list('show-goodthings').valueChanges();

  clearList() {
    if (confirm('This will delete this list from the database. Are you sure you want to do this?')) {
      this.db.list('show-goodthings').remove();
    }
  }
}
