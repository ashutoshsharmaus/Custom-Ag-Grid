import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ng-showcase',
  templateUrl: './ng-showcase.component.html',
  styleUrls: ['./ng-showcase.component.scss']
})
export class NgShowcaseComponent implements OnInit {
  value = 0;
  valueHundred = 0;
  showValue = false;
  constructor() { }

  ngOnInit() {
  const interval = setInterval(() => {
    if (this.value < 100) {
      this.value += 1;
      this.valueHundred += 1;
    } else {
      clearInterval(interval);
    }
  }, 50);
  }

}
