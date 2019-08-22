import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterData} from './FilterData';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {FilterDataSetByCategory} from './FilterDataSetByCategory';

@Component({
  selector: 'app-ng-filter-modal',
  templateUrl: './ng-filter-modal.component.html',
  styleUrls: ['./ng-filter-modal.component.scss']
})
export class NgFilterModalComponent implements OnInit {
  @Input() gridApi: any;
  @Input() currentlyAppliedFilter: Array<FilterData>;
  @Output() appliedFilterDataEvent = new EventEmitter();

  gridData: any;
  filterDataSet: Array<FilterData> = [];
  filterDataByCategory: Array<FilterDataSetByCategory> = [];


  constructor(private dialogRef: MatDialogRef<NgFilterModalComponent>) {
  }

  ngOnInit() {
    this.createFilterBox();
  }

  createFilterBox() {
    if (this.currentlyAppliedFilter) {
      this.filterDataSet = this.currentlyAppliedFilter;
      this.populateFilterDataByCategory();
    } else {
      this.getFilterableColumnProperties();
      this.populateFilterDataSet();
      this.populateFilterDataByCategory();
    }
  }

  getFilterableColumnProperties() {
    this.gridData = this.gridApi.rowData;
    const columns = this.gridApi.columnApi.getAllColumns();
    for (const column of columns) {
      if (column.visible && column.isFilterAllowed()) {
        const newFormControl = new FormControl();
        this.filterDataSet.push(new FilterData(column.colId, column.colDef.headerName, newFormControl, column.colDef.filterCategory));
      }
    }
  }

  populateFilterDataSet() {
    const filterDataSetIndex = new Map();
    this.filterDataSet.forEach((record, index) => {
      filterDataSetIndex.set(record.getColumn, index);
    });

    for (const record of this.gridData) {
      for (const [filterColumnId, columnIndex] of filterDataSetIndex) {
        const filterIdValue = record[filterColumnId];
        const isIncluded = (this.filterDataSet[columnIndex].filterData.indexOf(filterIdValue) >= 0);
        if (!isIncluded) {
          this.filterDataSet[columnIndex].filterData.push(filterIdValue);
        }
      }
    }
  }

  populateFilterDataByCategory() {
    const checkInFilterCategory = new Map();
    let filterDataByCategoryIndex = 0;
    for (const filterData of this.filterDataSet) {
      const filterCategoryIndex = checkInFilterCategory.get(filterData.getFilterCategory);
      if (filterCategoryIndex >= 0) {
        this.filterDataByCategory[filterCategoryIndex].getFilterCategoryArray.push(filterData);
      } else {
        const newFilterByCategory = new FilterDataSetByCategory(filterData.getFilterCategory, [filterData]);
        this.filterDataByCategory.push(newFilterByCategory);
        checkInFilterCategory.set(filterData.getFilterCategory, filterDataByCategoryIndex);
        filterDataByCategoryIndex++;
      }
    }
  }

  onFilterApply() {
    this.appliedFilterDataEvent.emit(this.filterDataSet);
    this.dialogRef.close();
  }

  onSelectAllClick(event) {
    const currentTargetVal = event.currentTarget.attributes['combobox-column'].value;
    for (const record of this.filterDataSet) {
      if (record.getColumn === currentTargetVal) {
        const allValues = record.getFilterData;
        record.getFormControl.setValue(allValues);
      }
    }
  }

  onClearAllButton(event) {
    const currentTargetVal = event.currentTarget.attributes['combobox-column'].value;
    for (const record of this.filterDataSet) {
      if (record.getColumn === currentTargetVal) {
        record.getFormControl.setValue(null);
      }
    }
  }

  onFilterModalClose() {
    this.dialogRef.close();
  }

  onClearFilterClick() {
    for (const record of this.filterDataSet) {
      record.getFormControl.setValue(null);
    }
    this.appliedFilterDataEvent.emit(this.filterDataSet);
  }
}
