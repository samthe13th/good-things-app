import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, AfterViewChecked{
  currentSegment = 'test';
  constructor(private authService: AuthService) { }

  ngOnInit() {
     console.log('init')
     this.authService.signInAnonymously();
  }

  ngAfterViewChecked() {
  }

  onFinishTyping(segment){
    console.log("finshed: ", segment)
  }
}
