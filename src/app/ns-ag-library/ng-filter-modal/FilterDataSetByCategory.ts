import {FilterData} from './FilterData';

export class FilterDataSetByCategory {
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
