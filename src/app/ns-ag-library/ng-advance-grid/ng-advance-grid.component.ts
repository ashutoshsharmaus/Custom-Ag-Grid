import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridApi} from 'ag-grid-community';

@Component({
  selector: 'app-ng-advance-grid',
  templateUrl: './ng-advance-grid.component.html',
  styleUrls: ['./ng-advance-grid.component.scss']
})
export class NgAdvanceGridComponent implements OnInit {
  @Input() gridApi: GridApi;
  @Input() gridTitle: string;
  @Input() groupByApplied: boolean;
  @Output() appliedFilterData = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  appliedFilterDataEvent(data) {
    this.appliedFilterData.emit(data);
  }
}
