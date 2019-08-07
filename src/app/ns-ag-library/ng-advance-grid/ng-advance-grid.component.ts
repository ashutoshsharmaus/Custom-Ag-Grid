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
    hideTitle: false;
    hideAdvanceSearch: false;
    hideGroupBy: false;
    hideFontSizeChange: false;
    hideHamburgerMenu: false;
    hidePrintExcel: false;
    hidePrintPDF: false;
    hideDownloadPDF: false;
    hideCustomizeReporting: false;

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
    const currentGrid = this.gridApi._nativeElement;
    const fontDetail = this.getFontDetail('-');
    const currentFont = fontDetail.currentFont;
    const newFontCss = fontDetail.newFontCss;
    if (newFontCss === 'font-14' || newFontCss === 'font-50') {
      if (!currentFont) {  currentGrid.classList.add(newFontCss); }
    } else {
      currentGrid.classList.add(newFontCss);
      currentGrid.classList.remove(currentFont);
    }
  }

  onIncreaseFontSizeClick() {
    const currentGrid = this.gridApi._nativeElement;
    const fontDetail = this.getFontDetail('+');
    const currentFont = fontDetail.currentFont;
    const newFontCss = fontDetail.newFontCss;

    if (newFontCss === 'font-14' || newFontCss === 'font-50') {
      if (!currentFont) {  currentGrid.classList.add(newFontCss); }
    } else {
      currentGrid.classList.add(newFontCss);
      currentGrid.classList.remove(currentFont);
    }
  }

  getFontDetail(newFontOperation) {
    const currentGrid = this.gridApi._nativeElement;
    const classList = [];
    currentGrid.classList.forEach(eachClass => classList.push(eachClass));
    const currentFont = classList.filter(record => {
      const reg = new RegExp('font-');
      return typeof record === 'string' && record.match(reg);
    })[0];
    const currentFontSize = (currentFont) ? parseInt(currentFont.split('font-')[1], 0) : 14; // default font size
    let newFontSize = (newFontOperation === '+') ? currentFontSize + 1 : currentFontSize - 1;
    if (newFontSize < 14) { newFontSize = 14; }
    if (newFontSize > 50) { newFontSize = 50; }
    const newFontCss = (currentFontSize) ? 'font-' + newFontSize : 'font-14';
    return {currentFont, newFontCss};
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
