import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ng-filter-modal',
  templateUrl: './ng-filter-modal.component.html',
  styleUrls: ['./ng-filter-modal.component.scss']
})
export class NgFilterModalComponent implements OnInit {
  @Input() gridApi: any;
  gridData: any;
  gridFilterByColumnId = [];


  constructor() {
  }

  ngOnInit() {
    this.createFilterBox();
  }

  createFilterBox() {
    this.initializeGridData();
  }

  initializeGridData() {
    this.gridData = this.gridApi.rowData;
    const columns = this.gridApi.columnApi.getColumnState();
    columns.forEach(column => {
      if (!column.hide) { this.gridFilterByColumnId.push(column.colId); }
    });
  }
}
