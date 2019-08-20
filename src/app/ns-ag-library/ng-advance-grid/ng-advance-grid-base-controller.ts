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

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.gridOptionsWrapper.gridOptions.isExternalFilterPresent = this.isExternalFilterPresent.bind(this);
    params.api.gridOptionsWrapper.gridOptions.doesExternalFilterPass = this.doesExternalFilterPass.bind(this);
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.applyColumnSetting(false);
  }

  applyColumnSetting(hasSavedColumn) {
    const savedColumnState = '[{"colId":"ag-Grid-AutoColumn","hide":false,"aggFunc":null,"width":200,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"model","hide":false,"aggFunc":null,"width":102,"pivotIndex":null,"pinned":null,"rowGroupIndex":null},{"colId":"make","hide":false,"aggFunc":null,"width":475,"pivotIndex":null,"pinned":null,"rowGroupIndex":0},{"colId":"price","hide":false,"aggFunc":null,"width":713,"pivotIndex":null,"pinned":null,"rowGroupIndex":null}]';
    if (hasSavedColumn) {
      this.gridApi.columnController.setColumnState(JSON.parse(savedColumnState));
    }
  }

  onGroupByChange() {
    (this.gridColumnApi.getRowGroupColumns().length > 0) ? this.groupByApplied = true : this.groupByApplied = false;
  }

  isExternalFilterPresent() {
    return this.appliedExternalFilter;
  }

  doesExternalFilterPass(node) {
    const something = Math.random() * 100;
    return something >= 50;
  }

  onFilterDataChange(data) {
    this.gridApi.onFilterChanged();
  }

  abstract getCustomizeReportingEndpointDetail();
}
