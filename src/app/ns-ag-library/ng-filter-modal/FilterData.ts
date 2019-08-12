export class FilterData {
  private columnHeader: string;
  private column: string;
  private filterType: string;
  private dataType: string;
  private filterBoxId: string;
  filterData = [];

  constructor(column, columnHeader) {
    this.column = column;
    this.columnHeader = columnHeader;
    this.filterBoxId = column + 'filterBoxId';
  }

  get getColumnHeader(): string {
    return this.columnHeader;
  }

  set setColumnHeader(value: string) {
    this.columnHeader = value;
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

  get getFilterData(): any[] {
    return this.filterData;
  }

  set setFilterData(value: any[]) {
    this.filterData = value;
  }
}
