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
  filterDataSet = {};

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
    const columns = this.gridApi.columnApi.getAllColumns();
    columns.forEach(column => {
      if (column.visible && column.isFilterAllowed()) {
        this.filterDataSet[column.colId] = {
          filterType: '',
          dataType: '',
          filterBoxId: '',
          filterData: []
        };
      }
    });
  }
}
