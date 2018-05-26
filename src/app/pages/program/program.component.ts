import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'program',
  templateUrl: './program.component.html',
    styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  section = 'about';

  constructor() { }

  ngOnInit() {
  }

  select(section) {
    this.section = section;
  }

}
