import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';

@Component({
  selector: 'user-management',
  template: `
    <div style="font-family: sans-serif; padding: 40px; max-width: 800px; margin: auto">
      <div>
        <h2>Codes</h2>
        <button (click)="generateCodes(13)">Generate New Codes</button>
        <p style="font-size: 16px; margin: 0" *ngFor="let code of codes | async">{{ code }}</p>
      </div>
      <div>
        <h2>Users</h2>
        <button (click)="refreshUserList()">Refresh User List</button>
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
  codes = this.db.list('codes').valueChanges();

  clearList() {
    if (confirm('This will delete this list from the database. Are you sure you want to do this?')) {
      this.db.list('show-goodthings').remove();
    }
  }

  generateCodes(n) {
    if (!confirm('This will replace the current set of codes with a new set. Are you sure you want to do this?')) {
      return;
    }
    const letters = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ';
    const codes = [];
    let codeString = '';
    const preshowUsers = ['21mishelle', '22sam', '23jiv', '24molly', '25christine'];

    _.forEach(_.range(n), (i) => {
      const code = `${('0' + (i + 1)).slice(-2)}${randomCode(4)}`;
      codeString += `\n${code}`;
      codes.push(code);
    });

    function randomCode(num) {
      let code = '';
      _.forEach(_.range(num), (char) => {
        code += letters[getRandomInt(0, letters.length - 1)];
      });
      return code;
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.db.object('preShowUsers').set(preshowUsers);
    this.db.object('codes').set([...codes, ...preshowUsers]);

    console.log(codeString);
  }

  refreshUserList() {
    if (!confirm("This will refresh the current user-list. Are you sure you want to do this?")) {
      return;
    }
    this.db.object('users').remove();
    this.db.object('pingUsers').set(Date.now());
  }
}
