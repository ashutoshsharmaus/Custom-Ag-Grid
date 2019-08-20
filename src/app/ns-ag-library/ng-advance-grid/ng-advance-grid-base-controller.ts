import {FilterData} from '../ng-filter-modal/FilterData';

export abstract class NgAdvanceGridBaseController {

  agGridDefaultCss = 'ag-theme-balham ag-grid-style';
  rowSelectionType = 'multiple';
  enableGroupEdit = true;
  columnDefinition: any ;
  rowData: any;
  gridColumnApi: any;
  gridApi: any;
  gridTitle: string;
  statusBar = {
    statusPanels: [
      {statusPanel: 'agTotalRowCountComponent', align: 'left'},
      { statusPanel: 'agFilteredRowCountComponent', align: 'left'},
      { statusPanel: 'agSelectedRowCountComponent', align: 'left'},
      { statusPanel: 'agAggregationComponent', align: 'left'}
    ]
  };
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true
  };
  getRowHeight = 50;
  enableRangeSelection = true;

  groupByApplied = false;

  appliedExternalFilter = false;
  appliedFilterDataSet: Array<FilterData >;

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.gridOptionsWrapper.gridOptions.isExternalFilterPresent = this.isExternalFilterPresent.bind(this);
    params.api.gridOptionsWrapper.gridOptions.doesExternalFilterPass = this.doesExternalFilterPass.bind(this);
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.applyColumnSetting(false);
  }

  applyColumnSetting(hasSavedColumn): void {
    const savedColumnState = '[{"colId":"ag-Grid-AutoColumn","hide":false,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"model","hide":false,"aggFunc":null,"width":102,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"make","hide":false,"aggFunc":null,"width":475,"pivotIndex":null,"pinned":null,"rowGroupIndex":0},{"colId":"price","hide":false,"aggFunc":null,"width":713,"pivotIndex":null,"pinned":null,"rowGroupIndex":null}]';
    if (hasSavedColumn) {
      this.gridApi.columnController.setColumnState(JSON.parse(savedColumnState));
    }
  }

  onGroupByChange(): void {
    (this.gridColumnApi.getRowGroupColumns().length > 0) ? this.groupByApplied = true : this.groupByApplied = false;
  }

  isExternalFilterPresent(): boolean {
    return this.appliedExternalFilter;
  }

  doesExternalFilterPass(node): boolean {
    debugger;
    let matched = false;
    this.appliedFilterDataSet.forEach(filterData => {
      const nodeColumnData = node.data[filterData.getColumn];
      const selectedValues = filterData.getFormControl.value;
      if (selectedValues) {
        matched = selectedValues.includes(nodeColumnData);
      }
    });
    return matched;
  }

  onFilterDataChange(filterDataSet: Array<FilterData >): void {
    this.appliedFilterDataSet = filterDataSet;
    this.appliedExternalFilter = true;
    this.gridApi.onFilterChanged();
  }

  abstract getCustomizeReportingEndpointDetail(): void;
}
