import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ng-showcase',
  templateUrl: './ng-showcase.component.html',
  styleUrls: ['./ng-showcase.component.scss']
})
export class NgShowcaseComponent implements OnInit {
  value = 50;
  valueHundred = 100;
  showValue = false;
  constructor() { }

  ngOnInit() {
  }

}
