import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
 @Input() segments: String[];
}
