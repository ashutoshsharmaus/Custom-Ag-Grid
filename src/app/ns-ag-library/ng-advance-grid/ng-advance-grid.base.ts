import {FilterData} from '../ng-filter-modal/FilterData';
import {GridApi, ColumnApi} from 'ag-grid-community';
import {ColumnState} from 'ag-grid-community/dist/lib/columnController/columnController';
import {ColDef, ColGroupDef} from 'ag-grid-community/src/ts/entities/colDef';


export abstract class NgAdvanceGridBase {

  agGridDefaultCss = 'ag-theme-balham ag-grid-style';
  rowSelectionType = 'multiple';
  enableGroupEdit = true;
  columnDefinition: (ColDef | ColGroupDef)[];
  rowData: any[];
  gridColumnApi: ColumnApi;
  gridApi: GridApi;
  gridTitle: string;
  statusBar = {
    statusPanels: [
      {statusPanel: 'agTotalRowCountComponent', align: 'right'},
      { statusPanel: 'agFilteredRowCountComponent', align: 'right'},
      { statusPanel: 'agSelectedRowCountComponent', align: 'right'},
      { statusPanel: 'agAggregationComponent', align: 'right'}
    ]
  };
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };
  getRowHeight = 60;
  enableRangeSelection = true;

  groupByApplied = false;

  appliedExternalFilter = false;
  appliedFilterDataSet: Array<FilterData >;
  savedColumn: ColumnState[];

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.gridOptionsWrapper.gridOptions.isExternalFilterPresent = this.isExternalFilterPresent.bind(this);
    params.api.gridOptionsWrapper.gridOptions.doesExternalFilterPass = this.doesExternalFilterPass.bind(this);
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.applyColumnSetting(false);
  }

  applyColumnSetting(hasSavedColumn): void {
    if (hasSavedColumn) {
      this.gridColumnApi.setColumnState(this.savedColumn);
    }
  }

  onGroupByChange(): void {
    (this.gridColumnApi.getRowGroupColumns().length > 0) ? this.groupByApplied = true : this.groupByApplied = false;
  }

  isExternalFilterPresent(): boolean {
    return this.appliedExternalFilter;
  }

  /**
   *
   * @param node it does something
   */
  doesExternalFilterPass(node): boolean {
    const matched: Array<boolean> = [];
    for (const filterData of this.appliedFilterDataSet) {
      const nodeColumnData = node.data[filterData.getColumn];
      const selectedValues = filterData.getFormControl.value;
      if (selectedValues) {
        matched.push((selectedValues.indexOf(nodeColumnData) >= 0));
      }
    }
    return !(matched.indexOf(false) >= 0);
  }

  onFilterDataChange(filterDataSet: Array<FilterData >): void {
    this.appliedFilterDataSet = filterDataSet;
    this.appliedExternalFilter = true;
    this.gridApi.onFilterChanged();
  }

  abstract getCustomizeReportingEndpointDetail(): void;
}
