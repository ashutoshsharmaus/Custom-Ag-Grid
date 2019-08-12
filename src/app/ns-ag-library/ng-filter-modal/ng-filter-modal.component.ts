import {Component, Input, OnInit} from '@angular/core';
import {FilterData} from './FilterData';

@Component({
  selector: 'app-ng-filter-modal',
  templateUrl: './ng-filter-modal.component.html',
  styleUrls: ['./ng-filter-modal.component.scss']
})
export class NgFilterModalComponent implements OnInit {
  @Input() gridApi: any;

  gridData: any;
  newFilterDataSet: Array<FilterData> = [];


  constructor() {
  }

  ngOnInit() {
    this.createFilterBox();
  }

  createFilterBox() {
    this.getFilterableColumnProperties();
    this.populateFilterDataSet();
  }

  getFilterableColumnProperties() {
    this.gridData = this.gridApi.rowData;
    const columns = this.gridApi.columnApi.getAllColumns();
    columns.forEach(column => {
      if (column.visible && column.isFilterAllowed()) {
        this.newFilterDataSet.push(new FilterData(column.colDef.headerName, column.colId));
      }
    });
  }

  populateFilterDataSet() {
    const filterDataSetIndex = new Map();
    this.newFilterDataSet.forEach((record, index) => {
      filterDataSetIndex.set(record.getColumn, index);
    });

    this.gridData.forEach(record => {
      filterDataSetIndex.forEach((columnIndex, filterColumnId) => {
        const filterIdValue = record[filterColumnId];
        const isIncluded = this.newFilterDataSet[columnIndex].filterData.includes(filterIdValue);
        if (!isIncluded) {
          this.newFilterDataSet[columnIndex].filterData.push(filterIdValue);
        }
      });
    });
  }
}
