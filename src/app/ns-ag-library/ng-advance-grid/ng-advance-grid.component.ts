import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-ng-advance-grid',
  templateUrl: './ng-advance-grid.component.html',
  styleUrls: ['./ng-advance-grid.component.scss']
})
export class NgAdvanceGridComponent implements OnInit {
  @Input() agGridAngular: AgGridAngular;
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
