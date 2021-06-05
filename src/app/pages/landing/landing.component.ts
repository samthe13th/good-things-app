import { Component, OnInit } from '@angular/core';
import { RainComponent } from '../../shared-components/rain/rain.component';

@Component({
  selector: 'app-landing',
  template: `
  <div class="landing">
    <rain></rain>
    <img class="boat" src="assets/sailboat.png"/>
    <div class="waveHorizontals">
    <div id="waveHorizontal1" class="waveHorizontal"></div>
      <div id="waveHorizontal2" class="waveHorizontal"></div>
      <div id="waveHorizontal3" class="waveHorizontal"></div>
    </div>
    <div class="content"></div>  
    <router-outlet></router-outlet>
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
