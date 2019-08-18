import {Component, Input, OnInit} from '@angular/core';
import {FilterData} from './FilterData';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

class FilterCategoryBy {
  private filterCategory: string;
  private filterCategoryArray: Array<FilterData>;

  constructor(filterCategory, filterCategoryArray) {
    this.filterCategory = filterCategory;
    this.filterCategoryArray = filterCategoryArray;
  }

  get getFilterCategory(): string {
    return this.filterCategory;
  }

  set setFilterCategory(value: string) {
    this.filterCategory = value;
  }

  get getFilterCategoryArray(): Array<FilterData> {
    return this.filterCategoryArray;
  }

  set setFilterCategoryArray(value: Array<FilterData>) {
    this.filterCategoryArray = value;
  }
}

@Component({
  selector: 'app-ng-filter-modal',
  templateUrl: './ng-filter-modal.component.html',
  styleUrls: ['./ng-filter-modal.component.scss']
})
export class NgFilterModalComponent implements OnInit {
  @Input() gridApi: any;

  gridData: any;
  filterDataSet: Array<FilterData> = [];
  filterDataByCategory: Array<FilterCategoryBy> = [];


  constructor(private dialogRef: MatDialogRef<NgFilterModalComponent>) {
  }

  ngOnInit() {
    this.createFilterBox();
  }

  createFilterBox() {
    this.getFilterableColumnProperties();
    this.populateFilterDataSet();
    this.populateFilterDataByCategory();
  }

  getFilterableColumnProperties() {
    this.gridData = this.gridApi.rowData;
    const columns = this.gridApi.columnApi.getAllColumns();
    columns.forEach(column => {
      if (column.visible && column.isFilterAllowed()) {
        const newFormControl = new FormControl();
        this.filterDataSet.push(new FilterData(column.colId, column.colDef.headerName,  newFormControl, column.colDef.filterCategory));
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

  populateFilterDataByCategory() {
    const checkInFilterCategory = new Map();
    let filterDataByCategoryIndex = 0;
    this.filterDataSet.forEach(filterData => {
      const filterCategoryIndex = checkInFilterCategory.get(filterData.getFilterCategory);
      if (filterCategoryIndex >= 0) {
        this.filterDataByCategory[filterCategoryIndex].getFilterCategoryArray.push(filterData);
      } else {
        const newFilterByCategory = new FilterCategoryBy(filterData.getFilterCategory, [filterData]);
        this.filterDataByCategory.push(newFilterByCategory);
        checkInFilterCategory.set(filterData.getFilterCategory, filterDataByCategoryIndex);
        filterDataByCategoryIndex++;
      }
    });
  }

  onFilterApply() {
    this.applyFilterOnGrid();
    debugger;
    this.dialogRef.close();
  }

  applyFilterOnGrid() {
    const filterDataSetIndex = new Map();
    this.filterDataSet.forEach((record, index) => {
      filterDataSetIndex.set(record.getColumn, index);
    });
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
