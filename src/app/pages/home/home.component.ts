import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
  <div class="home-content">
    <h1>Good Things To Do</h1>
    <nav class="home-nav">
      <a href="/program">Program</a>
      <a href="https://www.folda.ca/good-things-to-do/" target="_blank">Tickets</a>
      <a href="/stage">Stage</a>
    </nav>
  </div>
  `,
  styleUrls: ['./home.component.css'],
  host: {
    'class': 'home'
  }
})
export class HomeComponent {

}
