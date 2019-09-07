import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ng-showcase',
  templateUrl: './ng-showcase.component.html',
  styleUrls: ['./ng-showcase.component.scss']
})
export class NgShowcaseComponent implements OnInit {
  leftValue = 0;
  centerValue = 0;
  rightValue = 0;
  showValue = false;
  constructor() { }

  ngOnInit() {
  const interval = setInterval(() => {
    if (this.leftValue < 100) {
      this.leftValue ++;
    } else if (this.leftValue === 100 && this.centerValue < 100) {
      this.centerValue ++;
    } else if (this.leftValue === 100 && this.centerValue === 100 && this.rightValue < 100) {
      this.rightValue ++;
    } else {
      clearInterval(interval);
    }
  }, 20);
  }

}
