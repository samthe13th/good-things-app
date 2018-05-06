import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
    this.user = afAuth.authState;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  signInAnonymously() {
    console.log('sign in')
    return this.afAuth.auth.signInAnonymously().catch(function(error) {
      console.log("error: ", error.message)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  login(email: string, password: string) {

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((value) => {
        const status = 'online';
        this.setUserStatus(status);
      });
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = { email, displayName, status };

    this.db.object(path)
      .update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    }
  }
}
