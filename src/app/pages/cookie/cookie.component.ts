import { Component, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-stage',
  template: `
    <div style="width: 100vw; height: 100vh; display: block">
      <img (click)="onClick()" [src]="cookieSlide">
    </div>
  `,
})
export class CookieComponent {
  cookieSlide = 'assets/cookie/1.png';
  slideNumber = 1;

  onClick() {
    console.log('click');
    if (this.cookieSlide !== 'assets/cookie/15.png') {
      this.slideNumber++;
      this.cookieSlide = `assets/cookie/${this.slideNumber}.png`;
    }
  }
}
