import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { map, filter, each } from 'lodash';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'allthethings',
  templateUrl: './allthethings.component.html',
    styleUrls: ['./allthethings.component.css']
})
export class AllTheThingsComponent implements OnInit {
    editing = false;
    goodthings: FirebaseListObservable<any[]>;
    editableList: string = '';

    @ViewChild('list') things: ElementRef;

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit() {
      setTimeout(() => {
          this.authService.signInAnonymously();
          this.goodthings = this.chatService.getMasterList();
      })
  }

  edit() {
      this.editableList = "";
      this.editing = true;
      this.goodthings.take(1).subscribe((things) => {
          each(things, (thing, index) => {         
              this.editableList = `${this.editableList}- ${thing.$value}`;
              if (parseInt(index) !== (things.length - 1)) {
                  this.editableList += '\n';
              }
          })
      })
      setTimeout(() => {
          this.things.nativeElement.value = this.editableList;
      })
  }

  updateList(list) {
      const goodthings = (list.value).split('- ').splice(1)
      const trimmedList = map(goodthings, thing => thing.trim());
      this.editing = false;
      this.chatService.updateMasterList(trimmedList);
  }
}
