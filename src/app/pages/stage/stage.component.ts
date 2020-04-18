import { Component } from '@angular/core';
import * as _ from 'lodash';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css'],
})
export class StageComponent {
  invalidCode = false;

  constructor (
    private router: Router,
    private db: AngularFireDatabase) {
  }

  enterCode(code) {
    this.db.object('codes').valueChanges()
      .pipe(take(1))
      .subscribe((codes: string) => {
        if (_.includes(codes, code)) {
          this.invalidCode = false;
          this.router.navigate([`stage/${code}`]);
        } else {
          this.invalidCode = true;
        }
      });
  }
}
