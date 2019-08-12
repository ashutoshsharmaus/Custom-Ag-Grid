import {Component, Input, OnInit} from '@angular/core';
import {FilterData} from './FilterData';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-ng-filter-modal',
  templateUrl: './ng-filter-modal.component.html',
  styleUrls: ['./ng-filter-modal.component.scss']
})
export class NgFilterModalComponent implements OnInit {
  @Input() gridApi: any;

  gridData: any;
  newFilterDataSet: Array<FilterData> = [];


  constructor(private dialogRef: MatDialogRef<NgFilterModalComponent>) {
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
        const newFormControl = new FormControl();
        this.newFilterDataSet.push(new FilterData(column.colDef.headerName, column.colId, newFormControl));
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

  onFilterApply() {
    this.applyFilterOnGrid();
    this.dialogRef.close();
  }

  applyFilterOnGrid() {
    const filterDataSetIndex = new Map();
    this.newFilterDataSet.forEach((record, index) => {
      filterDataSetIndex.set(record.getColumn, index);
    });
  }

  onFilterModalClose() {
    this.dialogRef.close();
  }
}
