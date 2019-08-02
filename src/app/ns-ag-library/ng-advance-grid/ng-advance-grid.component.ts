import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NgColumnSelectorComponent} from '../ng-column-selector/ng-column-selector.component';
import {NgGroupbyGridComponent} from '../ng-groupby-grid/ng-groupby-grid.component';

@Component({
  selector: 'app-ng-advance-grid',
  templateUrl: './ng-advance-grid.component.html',
  styleUrls: ['./ng-advance-grid.component.scss']
})
export class NgAdvanceGridComponent implements OnInit {
  @Input() gridApi: any;

  fullScreenActive = false;
  activeFullScreen = {
    'full-screen': this.fullScreenActive,
    'regular-fit': !this.fullScreenActive
  };

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onAdvanceSearchType(event) {
    if (event.key === 'Enter') {
      const typedValue = event.currentTarget.value;
      this.gridApi.api.setQuickFilter(typedValue);
    }
  }

  onGroupByPlus() {
    this.gridApi.api.expandAll();
  }

  onGroupByMinus() {
    this.gridApi.api.collapseAll();
  }

  onGridExportExcelClick() {
    this.gridApi.api.exportDataAsExcel();
  }

  onGroupBySelect(event) {
    this.gridApi.columnApi.addRowGroupColumn(event.value);
  }

  onGridPrintPdfClick() {
    this.setPrinterFriendly(this.gridApi);
    print();
  }

  onResetGroupBy() {
    const allGroupBy = this.gridApi.columnApi.getRowGroupColumns();
    debugger;
    // for (const i = 0; i < allGroupBy.length; i++) {
    //   this.agGrid.columnApi.removeRowGroupColumns(allGroupBy[i]);
    //
    // }
    this.gridApi.columnApi.removeRowGroupColumns(allGroupBy);
    // this.selectedGroupBy = null;
  }

  onDecreaseFontSizeClick() {
  }

  onIncreaseFontSizeClick() {
  }

  onToggleFullScreenClick() {
    this.fullScreenActive = !this.fullScreenActive;
    this.activeFullScreen = {
      'full-screen': this.fullScreenActive,
      'regular-fit': !this.fullScreenActive
    };
  }

  setPrinterFriendly(api) {
    debugger;
    // var eGridDiv = document.querySelector(".my-grid");
    // eGridDiv.style.width = "";
    // eGridDiv.style.height = "";
    // api.setDomLayout("print");
  }

  onColumnSelectorClick() {
    const columnSelectorDialog = this.dialog.open(NgColumnSelectorComponent, {});
    columnSelectorDialog.componentInstance.gridColumnApi = this.gridApi.columnApi;
  }

  onGroupyByClick() {
    const groupByDialog = this.dialog.open(NgGroupbyGridComponent, {});
    groupByDialog.componentInstance.gridColumnApi = this.gridApi.columnApi;
  }
}
