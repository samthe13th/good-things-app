import { Component, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { StoryService } from '../../services/story.service';
import { SHOW } from '../../story';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { debounceTime } from 'rxjs/internal/operators';
import { take, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalComponent } from '../../shared-components/modal/modal.component';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css'],
})
export class StageComponent implements AfterViewInit, OnChanges {
  @ViewChild('scroller') scroller: ElementRef;
  @ViewChild('input') chatInput: ElementRef;
  @ViewChild('audioModal') audioModal: ModalComponent;

  currentSegment: Observable<any>;
  currentBlock: any;
  id;
  mode;
  isPrivate;
  debounceTime = 10000;
  setupMode = true;
  colors = [];
  delay;
  landing = true;
  theme = 'light';
  showRamp = true;
  invalidCode = false;
  audioCheck;
  isPreShowUser = false;
  showEnded = false;

  showStage = this.db.object('showStage').valueChanges();
  delayConfigured;

  constructor (
    private db: AngularFireDatabase,
    private authService: AuthService,
    private chatService: ChatService,
    private story: StoryService ) {
      this.story.getPrivacy()
        .valueChanges()
        .pipe(debounceTime(this.debounceTime))
        .subscribe((privacy) => {
          this.isPrivate = privacy;
      });

      this.story.getBlockType()
        .valueChanges()
        .pipe(
          tap((value) => {
            if (this.mode === 'chat') {
              this.mode = value;
            }
          }),
          debounceTime(this.debounceTime)
        )
        .subscribe((type) => {
          this.mode = type;
          if (this.chatInput && type === 'chat') {
            setTimeout(() => {
              this.chatInput.nativeElement.focus();
            });
          }
          if (type === 'end') {
            this.showEnded = true;
          }
        });

      this.db.object('theme')
        .valueChanges()
        .pipe(debounceTime(this.debounceTime))
        .subscribe((value: string) => {
          if (value !== undefined) {
            this.showRamp = false;
            setTimeout(() => {
              this.theme = value;
              this.showRamp = true;
            }, 2000);
          }
        });


  }

  initUser() {
    setTimeout(() => {
      this.authService.signInAnonymously();
      this.chatService.addUser(this.id);
    });
    this.currentSegment = this.story.getCurrentSegment();
  }

  enterCode(code) {
    this.db.object('showCodes').valueChanges()
      .pipe(take(1))
      .subscribe((codes) => {
        if (_.includes(codes, code)) {
          this.invalidCode = false;
          this.landing = false;
          this.id = code;
          this.initUser();
          this.db.object('preShowUsers').valueChanges()
            .pipe(take(1))
            .subscribe((users) => {
              this.isPreShowUser = _.includes(users, this.id);
            })

          this.db.object(`users/${this.id}/delayConfigured`).valueChanges().subscribe((value) => {
            this.delayConfigured = value;
          })
        } else {
          this.invalidCode = true;
        }
      });
  }

  ngOnChanges() {
    this.scrollToBottom();
    this.currentSegment = this.story.getCurrentSegment();
  }

  configDelay() {
    this.db.object('delayTimer').valueChanges()
      .pipe(take(1))
      .subscribe((delay) => {
        this.delay = _.toNumber(delay);
        const userConfig = this.chatService.getUserConfig(this.id, { delay: this.delay, delayConfigured: true })
        _.forEach(userConfig, (value, key) => {
          this.db.object(`users/${this.id}/${key}`).set(value);
        })
        this.debounceTime = this.delay * 1000;
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  onFinishTyping(segment) {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.scroller) {
      this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
    }
  }

  onAdvanceScroll(boolean) {
    if (!this.setupMode) {
      this.scrollToBottom();
    }
  }

  submit(input) {
    this.chatInput.nativeElement.focus();
    this.chatService.sendMessage(input.value, this.id, this.id);
    this.story.tellStory({
      isPrivate: this.isPrivate,
      value: input.value,
      type: 'chat',
      canView: this.id,
      user: this.id,
      color: SHOW.users[parseInt(this.id, 10) - 1].color,
    });
    input.value = '';
  }

  onCurrentBlockChange(block) {
    setTimeout(() => {
      this.currentBlock = block;
      this.scrollToBottom();
    })
  }

  openAudioModal() {
    this.audioModal.open();
  }

  hearsAudio(canHear) {
    console.log("can hear? ", canHear)
    this.db.object(`users/${this.id}/canHear`).set(canHear);
  }
}
