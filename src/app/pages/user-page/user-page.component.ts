import { Component, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit, Inject } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { TooltipComponent } from '../../shared-components/tooltip/tooltip.component';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements AfterViewInit, OnChanges {
  @ViewChild('scroller') scroller: ElementRef;
  @ViewChild('input') chatInput: ElementRef;
  @ViewChild('audioModal') audioModal: ModalComponent;
  @ViewChild('configTooltip') configTooltip: TooltipComponent;

  currentSegment: Observable<any>;
  currentBlock: any;
  id;
  mode;
  isPrivate;
  debounceTime = 10000;
  setupMode = true;
  delay;
  landing = true;
  theme = 'light';
  showRamp = true;
  invalidCode = false;
  audioCheck;
  isPreShowUser = false;
  showEnded = false;
  userConfig;
  delayConfigured;
  fullscreen = 'off';

  showStage = this.db.object('showStage').valueChanges();
  showDelay = this.db.object('showDelay').valueChanges();
  onBoarded = false;

  constructor (
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private chatService: ChatService,
    private story: StoryService ) {
    this.id = this.activatedRoute.snapshot.url[1].path;
    this.db.object(`users/${this.id}/onBoarded`).valueChanges().subscribe((value: boolean) => {
      this.onBoarded = value;
    })
    this.db.object('preShowUsers').valueChanges()
      .pipe(take(1))
      .subscribe((users: string) => {
        this.isPreShowUser = _.includes(users.split(','), this.id);
      });
    this.db.object('showCodes').valueChanges().pipe(take(1)).subscribe((value: string) => {
      if (!_.includes(value, this.id)) {
        this.router.navigate(['/stage']);
      } else {
        this.initUser();

        this.db.object(`users/${this.id}/delayConfigured`).valueChanges().subscribe((value) => {
          this.delayConfigured = value;
        });

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
          .pipe(debounceTime(this.debounceTime - 2000))
          .subscribe((value: string) => {
            if (value !== undefined) {
              this.showRamp = false;
              setTimeout(() => {
                this.theme = value;
                this.showRamp = true;
              }, 2000);
            }
          });

        document.addEventListener('fullscreenchange', (event) => {
          if (document.fullscreenElement) {
            this.fullscreen = 'on';
          } else {
            this.fullscreen = 'off';
          }
        });
      }
    });
  }

  initUser() {
    setTimeout(() => {
      this.authService.signInAnonymously();
      this.db.object(`users/${this.id}`).valueChanges().subscribe((user) => {
        if (!user) {
          this.userConfig = this.chatService.getUserConfig(this.id);
          this.chatService.addUser(this.userConfig);
        } else {
          this.userConfig = user;
        }
      });
    });
    this.currentSegment = this.story.getCurrentSegment();
  }

  enterCode(code) {
    this.db.object('showCodes').valueChanges()
      .pipe(take(1))
      .subscribe((codes) => {
        if (_.includes(codes, code)) {
          console.log('id: ', code)
          this.router.navigate([`stage/${code}`]);
          this.openAudioModal();
          this.invalidCode = false;
          this.landing = false;
          this.id = code;
          this.initUser();
          this.db.object('preShowUsers').valueChanges()
            .pipe(take(1))
            .subscribe((users) => {
              this.isPreShowUser = _.includes(users, this.id);
            });
          this.db.object(`users/${this.id}/delayConfigured`).valueChanges().subscribe((value) => {
            this.delayConfigured = value;
          });
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
        if (this.delay && this.delay > 0) {
          this.userConfig = this.chatService.getUserConfig(this.id, { delay: this.delay, delayConfigured: true });
          _.forEach(this.userConfig, (value, key) => {
            this.db.object(`users/${this.id}/${key}`).set(value);
          });
          this.debounceTime = this.delay * 1000;
        }
      });
  }

  ngAfterViewInit() {
    this.db.object('pingUsers').valueChanges().subscribe((ping) => {
      console.log('ping: ', ping)
      if (this.userConfig) {
        this.chatService.addUser(this.userConfig);
      }
    });
    this.scrollToBottom();
  }

  onFinishTyping() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.scroller) {
      this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
    }
  }

  onAdvanceScroll() {
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
    if (this.isPrivate === false) {
      this.db.list('show-goodthings').push(input.value);
    }
    input.value = '';
  }

  onCurrentBlockChange(block) {
    setTimeout(() => {
      this.currentBlock = block;
      this.scrollToBottom();
    });
  }

  openAudioModal() {
    this.audioModal.open();
    this.db.object(`users/${this.id}/onBoarded`).set(true);
  }

  setFullScreen(on) {
    if (on) {
      const elem: any = document.documentElement as any;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    } else {
      const doc: any = document;
      if (doc.exitFullscreen) {
        document.exitFullscreen();
      } else if (doc.mozCancelFullScreen) { /* Firefox */
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) { /* IE/Edge */
        doc.msExitFullscreen();
      }
    }
  }

  hearsAudio(canHear) {
    console.log("can hear? ", canHear)
    this.db.object(`users/${this.id}/canHear`).set(canHear);
  }
}
