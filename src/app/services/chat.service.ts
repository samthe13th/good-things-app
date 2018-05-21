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
      
    });
  }

  clear() {
    this.db.list('messages').remove();
    this.db.list('users').remove();
  }

  getUser(id) {
    const path = `/users/${id}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(message, id, user) {
    console.log('send message: ', message, id, user)
    this.chatMessages = this.getMessages(id);
    this.chatMessages.push({
      message, 
      id, 
      user
    });
    this.setUnreads(id, true);
  }

  setUnreads(id, value) {
    this.db.object(`/users/${id}/unread`).set(value)
  }

  getUserList() {
    return this.db.list('users')
  }
  
  addUser(user) {
    const userList = this.getUserList();
    userList.set(user.id, user);
  }

  getMessages(user) {
    return this.db.list(`messages/${user}`);
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