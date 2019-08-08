export abstract class NgAdvanceGridBaseController {
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
  enableRangeSelection = 'true';

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onCellChanged() {

  }
}
