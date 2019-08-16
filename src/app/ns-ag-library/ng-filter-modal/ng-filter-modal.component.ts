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
  filterDataSet: Array<FilterData> = [];


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
        this.filterDataSet.push(new FilterData(column.colDef.headerName, column.colId, newFormControl));
      }
    });
  }

  populateFilterDataSet() {
    const filterDataSetIndex = new Map();
    this.filterDataSet.forEach((record, index) => {
      filterDataSetIndex.set(record.getHeaderName, index);
    });

    this.gridData.forEach(record => {
      filterDataSetIndex.forEach((columnIndex, filterColumnId) => {
        const filterIdValue = record[filterColumnId];
        const isIncluded = this.filterDataSet[columnIndex].filterData.includes(filterIdValue);
        if (!isIncluded) {
          this.filterDataSet[columnIndex].filterData.push(filterIdValue);
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
    this.filterDataSet.forEach((record, index) => {
      filterDataSetIndex.set(record.getColumn, index);
    });
    debugger;
  }

  onSelectAllClick(event) {
    const currentTargetVal = event.currentTarget.attributes['combobox-column'].value;
    this.filterDataSet.forEach(record => {
      if (record.getColumn === currentTargetVal) {
        const allValues = record.getFilterData;
        record.getFormControl.setValue(allValues);
      }
    });
  }

  onClearAllButton(event) {
    const currentTargetVal = event.currentTarget.attributes['combobox-column'].value;
    this.filterDataSet.forEach(record => {
      if (record.getColumn === currentTargetVal) {
        record.getFormControl.setValue(null);
      }
    });
  }

  onFilterModalClose() {
    this.dialogRef.close();
  }

  onClearFilterClick() {
    this.filterDataSet.forEach(record => {
      record.getFormControl.setValue(null);
    });
  }
}
