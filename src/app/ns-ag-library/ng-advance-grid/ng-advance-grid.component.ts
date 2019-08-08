import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ng-advance-grid',
  templateUrl: './ng-advance-grid.component.html',
  styleUrls: ['./ng-advance-grid.component.scss']
})
export class NgAdvanceGridComponent implements OnInit {
  @Input() gridApi: any;
  @Input() gridTitle: string;
  @Input() groupByApplied: any;

  constructor() {
  }

  ngOnInit() {
  }
}
