import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
  <div class="landing">
  <div class="rain">
    <div [style.animation-delay]="drop.delay" [style.left]="drop.x" *ngFor="let drop of rain" class="raindrop"></div>
  </div>
  <img class="boat" src="assets/sailboat.png"/>
  <div class="waveHorizontals">
	<div id="waveHorizontal1" class="waveHorizontal"></div>
    <div id="waveHorizontal2" class="waveHorizontal"></div>
    <div id="waveHorizontal3" class="waveHorizontal"></div>
  </div>
  <div class="content"></div>
  <h1>good things to do.</h1>
  </div>
  `,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor() { }
  rain;
  ngOnInit() {
    this.generateRain();
  }

  generateRain() {
    this.rain = [];
    for (let i = 0; i < 50; i++) {
      this.rain.push({
        x: `${Math.ceil(Math.random() * 100)}%`,
        delay: `${Math.ceil(Math.random() * 10000) + 300}ms`
      })
    }
  }

}
