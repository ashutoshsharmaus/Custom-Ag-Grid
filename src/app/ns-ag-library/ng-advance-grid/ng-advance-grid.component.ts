import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ng-advance-grid',
  templateUrl: './ng-advance-grid.component.html',
  styleUrls: ['./ng-advance-grid.component.scss']
})
export class NgAdvanceGridComponent implements OnInit {
  @Input() gridApi: any;
  @Input() gridTitle: string;
  @Input() groupByApplied: any;
  @Output() appliedFilterData = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  appliedFilterDataEvent(data) {
    this.appliedFilterData.emit(data);
  }
}
