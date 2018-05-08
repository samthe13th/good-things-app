import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {
user: firebase.User;
chatMessages;
userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) { 
    
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }   
      
      this.getUser().subscribe(a => {
        this.userName = a.displayName;
      })
      
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
    });
    console.log('send message');
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}