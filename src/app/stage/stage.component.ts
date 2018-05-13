import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller: ElementRef;

  currentSegment = 'test';
  constructor(private authService: AuthService) { }

  ngOnInit() {
     console.log('init')
     this.authService.signInAnonymously();
  }

  ngAfterViewInit() {
    console.log('scroll top ', this.scroller.nativeElement.scrollTop);
    console.log('scroll height ', this.scroller.nativeElement.clientHeight);
    this.scrollToBottom();
    console.log('scroll top ', this.scroller.nativeElement.scrollTop);
  }

  onFinishTyping(segment) {
    console.log("finshed: ", segment)
      this.scrollToBottom();
      console.log('scroll top ', this.scroller.nativeElement.scrollTop); 
  }

  scrollToBottom() {
    this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
    console.log('scroll top ', this.scroller.nativeElement.scrollTop); 
  }

  onAdvanceScroll(boolean) {
    console.log("ADVANCE SCROLL");
    this.scrollToBottom();
  }
}
