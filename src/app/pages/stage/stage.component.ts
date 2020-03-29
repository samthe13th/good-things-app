import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { StoryService } from '../../services/story.service';
import { SHOW } from '../../story'
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('scroller') scroller: ElementRef;
  currentSegment: Observable<any>;
  userObservable: Observable<any>;
  currentBlock: any;
  id;
  mode;
  isPrivate;
  debounceTime = 200;

  constructor (
    private authService: AuthService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private story: StoryService ) {
    this.route.params.subscribe(params => this.id = params.id);
    this.story.getBlockType()
      .valueChanges()
      .pipe(debounceTime(this.debounceTime))
      .subscribe((mode) => {
      this.mode = mode;
    });
    this.story.getPrivacy()
      .valueChanges()
      .pipe(debounceTime(this.debounceTime))
      .subscribe((privacy) => {
      this.isPrivate = privacy;
    });
  }

  ngOnInit() {
    setTimeout(() => {
     this.authService.signInAnonymously();
    });
    this.currentSegment = this.story.getCurrentSegment();
  }

  ngOnChanges() {
    this.scrollToBottom();
    this.currentSegment = this.story.getCurrentSegment();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  onFinishTyping(segment) {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
  }

  onAdvanceScroll(boolean) {
    this.scrollToBottom();
  }

  submit(input) {
    this.chatService.sendMessage(input.value, this.id, this.id);
    this.story.tellStory({
      isPrivate: this.isPrivate,
      value: input.value,
      type: 'chat',
      canView: this.id,
      user: this.id,
      color: SHOW.users[parseInt(this.id) - 1].color,
    });
    input.value = '';
  }

  onCurrentBlockChange(block) {
    this.currentBlock = block;
    this.scrollToBottom();
  }
}
