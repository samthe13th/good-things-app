import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rain',
  template: `
    <div
      [style.animation-delay]="drop.delay"
      [style.left]="drop.x"
      *ngFor="let drop of rain"
      class="raindrop">
    </div>
  `,
  host: {
    'class': 'rain'
  }
})
export class RainComponent implements OnInit {
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
