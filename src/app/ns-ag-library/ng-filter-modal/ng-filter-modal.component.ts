import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterData} from './FilterData';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {FilterDataSetByCategory} from './FilterDataSetByCategory';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-ng-filter-modal',
  templateUrl: './ng-filter-modal.component.html',
  styleUrls: ['./ng-filter-modal.component.scss']
})
export class NgFilterModalComponent implements OnInit {
  @Input() gridApi: AgGridAngular;
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

  /**
   * This method is called on the Init of the component.
   * If the filter has already been applied in the grid it will take the existing filter and
   * set it to the filterDataSet other wise create filterDataSet and filterDataSetByCategory by reading
   * the current state of the grid.
   */
  createFilterBox(): void {
    if (this.currentlyAppliedFilter) {
      this.filterDataSet = this.currentlyAppliedFilter;
      this.populateFilterDataByCategory();
    } else {
      this.getFilterableColumnProperties();
      this.populateFilterDataSet();
      this.populateFilterDataByCategory();
    }
  }

  /**
   * This method is initially used to set the private variables gridData and empty filterDataSet.
   */
  getFilterableColumnProperties(): void {
    this.gridData = this.gridApi.rowData;
    const columns = this.gridApi.columnApi.getAllColumns();
    for (const column of columns) {
      if (column.isVisible() && column.isFilterAllowed()) {
        const newFormControl = new FormControl();
        this.filterDataSet.push(
          // @ts-ignore
          new FilterData(column.getColId(), column.getColDef().headerName, newFormControl, column.getColDef().filterCategory));
      }
    }
  }

  /**
   * This method will get the grid Data and populate the filterDataSet.
   */
  populateFilterDataSet(): void {
    const filterDataSetIndex = new Map();
    this.filterDataSet.forEach((record, index) => {
      filterDataSetIndex.set(record.getColumn, index);
    });
    for (const record of this.gridData) {
      for (const [filterColumnId, columnIndex] of filterDataSetIndex) {
        const filterIdValue = record[filterColumnId];
        this.filterDataSet[columnIndex].filterData.add(filterIdValue);
      }
    }
  }

  /**
   * This method will populate filterDataByCategory with the existing filterDataSet
   */
  populateFilterDataByCategory(): void {
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

  /**
   * This method emits and event on when apply filter is clicked.
   * Array<FilterData> is passed while emitting the appliedFilterDataSet.
   */
  onFilterApply(): void {
    this.appliedFilterDataEvent.emit(this.filterDataSet);
    this.dialogRef.close();
  }

  /**
   *
   * Attributes to the buttons are added in the html portion
   * @param event: This is the button event that has the button attributes
   */
  onSelectAllClick(event): void {
    const currentTargetVal = event.currentTarget.attributes['combobox-column'].value;
    for (const record of this.filterDataSet) {
      if (record.getColumn === currentTargetVal) {
        const allValues = record.getFilterData;
        record.getFormControl.setValue([...allValues]);
      }
    }
  }

  /**
   * @param event: This is the button event that has the button attributes
   * Attributes to the buttons are added in the html portion
   */
  onClearAllButton(event): void {
    const currentTargetVal = event.currentTarget.attributes['combobox-column'].value;
    for (const record of this.filterDataSet) {
      if (record.getColumn === currentTargetVal) {
        record.getFormControl.setValue(null);
      }
    }
  }

  /**
   * Closes the filter modal
   */
  onFilterModalClose(): void {
    this.dialogRef.close();
  }

  /**
   * Clears the filter of the filter modal.
   */
  onClearFilterClick(): void {
    for (const record of this.filterDataSet) {
      record.getFormControl.setValue(null);
    }
    this.appliedFilterDataEvent.emit(this.filterDataSet);
  }
}
