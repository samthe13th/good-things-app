import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'landing',
  template: `
    <h1>Good Things To Do</h1>
    <form>
      <input #codeInput placeholder="Enter Show Code"/>
      <button (click)="submit(codeInput.value)">Enter</button>
    </form>
  `,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService) {
  }

  submit(code) {
    console.log('submit: ', code)
  }
}
