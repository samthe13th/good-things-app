import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { each } from 'lodash';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

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

  getMasterList(): Observable<any[]> {
    return this.db.list('goodthings').valueChanges()
  }

  getMasterListObject() {
    return this.db.object('goodthings');
  }

  updateMasterList(list) {
    this.db.object('goodthings').set(list)
  }

  sendMessage(message, id, user) {
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
