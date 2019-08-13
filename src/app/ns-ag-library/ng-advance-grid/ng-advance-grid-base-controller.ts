export abstract class NgAdvanceGridBaseController {

  agGridDefaultCss = 'ag-theme-balham ag-grid-style';
  rowSelectionType = 'multiple';
  enableGroupEdit = true;
  columnDefinition: any;
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

  isExternalFilter = false;

  onGridReady(params) {
    this.gridApi = params.api;
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
    return (this.isExternalFilter);
  }

  doesExternalFilterPass(node) {
    console.log('yo');
    return false;
  }

  onApplyFilterButtonClick() {
    debugger;
    this.isExternalFilter = true;
    this.gridApi.onFilterChanged();
  }
}
