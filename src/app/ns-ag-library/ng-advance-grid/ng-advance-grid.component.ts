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
  @Input() gridTitle: string;

  fullScreenActive = false;
  fullScreenRegularBtnIcon = 'fullscreen';
  activeFullScreen = {
    'full-screen': this.fullScreenActive,
    'regular-fit': !this.fullScreenActive
  };
  gridRowHeight = 16 ;

  constructor(private dialog: MatDialog) {
  }

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

  onGridPrintPdfClick() {
    this.setPrinterFriendly(this.gridApi);
    print();
  }

  onDecreaseFontSizeClick() {
  }

  onIncreaseFontSizeClick() {
    // debugger;
    // this.gridRowHeight += (22 >= this.gridRowHeight) ? 2 : 0;
    this.gridRowHeight += 2;
    this.gridApi.api.resetRowHeights(this.gridRowHeight);
  }

  onToggleFullScreenClick() {
    this.fullScreenActive = !this.fullScreenActive;
    this.activeFullScreen = {
      'full-screen': this.fullScreenActive,
      'regular-fit': !this.fullScreenActive
    };
    this.fullScreenRegularBtnIcon = (this.fullScreenActive) ? 'fullscreen_exit' : 'fullscreen';
  }

  setPrinterFriendly(api) {
    debugger;
    // const eGridDiv = document.querySelector(".my-grid");
    // eGridDiv.style.width = '';
    // eGridDiv.style.height = '';
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
