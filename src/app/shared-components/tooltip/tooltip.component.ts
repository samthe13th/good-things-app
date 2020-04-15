import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tooltip',
  template: `
    <div class="tooltip" [class.hidden]="!visible" [style.top.px]="top" [style.right.px]="right">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<any>();
  @Input() anchor: HTMLElement;
  @Input() visible = true;

  top;
  right;

  tooltipOffsetX = 35;
  tooltipOffsetY = 15;

  ngOnInit() {
    const boundingRect = this.anchor.getBoundingClientRect();
    this.top = boundingRect.top + boundingRect.height + this.tooltipOffsetY;
    this.right = (window.innerWidth - boundingRect.right) - this.xOffset(boundingRect.width);
  }

  xOffset(anchorWidth) {
    return (anchorWidth / 2) + (this.tooltipOffsetX - anchorWidth);
  }
}
