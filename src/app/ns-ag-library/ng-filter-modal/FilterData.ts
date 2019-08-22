import {FormControl} from '@angular/forms';

export class FilterData {
  private headerName: string;
  private column: string;
  private filterType: string;
  private dataType: string;
  private filterBoxId: string;
  private formControl: FormControl;
  private filterCategory: string;
  filterData = new Set();

  constructor(column, columnHeader, formControl, filterCategory) {
    this.column = column;
    this.headerName = columnHeader;
    this.filterBoxId = column + 'filterBoxId';
    this.formControl = formControl;
    this.filterCategory = (filterCategory) ? filterCategory : 'General';
  }

  get getFormControl(): FormControl {
    return this.formControl;
  }

  set setFilterCategory(value: string) {
    this.filterCategory = value;
  }

  get getFilterCategory(): string {
    return this.filterCategory;
  }

  set setFormControl(value: FormControl) {
    this.formControl = value;
  }

  get getHeaderName(): string {
    return this.headerName;
  }

  set setColumnHeader(value: string) {
    this.headerName = value;
  }

  get getColumn(): string {
    return this.column;
  }

  set setColumn(value: string) {
    this.column = value;
  }

  get getFilterType(): string {
    return this.filterType;
  }

  set setFilterType(value: string) {
    this.filterType = value;
  }

  get getDataType(): string {
    return this.dataType;
  }

  set setDataType(value: string) {
    this.dataType = value;
  }

  get getFilterData(): Set<any> {
    return this.filterData;
  }
}
