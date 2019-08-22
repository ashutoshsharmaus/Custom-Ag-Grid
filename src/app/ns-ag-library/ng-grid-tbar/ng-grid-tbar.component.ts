import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NgColumnSelectorComponent} from '../ng-column-selector/ng-column-selector.component';
import {NgGroupbyGridComponent} from '../ng-groupby-grid/ng-groupby-grid.component';
import {NgFilterModalComponent} from '../ng-filter-modal/ng-filter-modal.component';
import {FilterData} from '../ng-filter-modal/FilterData';

@Component({
  selector: 'app-ng-grid-tbar',
  templateUrl: './ng-grid-tbar.component.html',
  styleUrls: ['./ng-grid-tbar.component.scss']
})
export class NgGridTbarComponent implements OnInit {
  @Input() gridApi: any;
  @Input() gridTitle: string;
  @Input() nsAdvanceGridWrapper: any;
  @Input() groupByApplied: any;
  @Output() appliedFilterDataEvent = new EventEmitter();

  fullScreenRegularBtnIcon = 'fullscreen';
  showTitle = true;
  showAdvanceSearch = true;
  showFilterBtn: true;
  showGroupBy: true;
  showFontSizeChange: true;
  showHamburgerMenu: true;
  showPrintExcel: true;
  showPrintPDF: true;
  showDownloadPDF: true;
  showCustomizeReporting: true;
  appliedGroupBy = true;
  filterCount = '(0)';
  groupByCount = '(0)';
  currentFilter: Array<FilterData>;

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
    this.setPrinterFriendly();
    print();
  }

  setPrinterFriendly() {
    const currentGrid = this.gridApi.api;
    currentGrid.setDomLayout('print');
  }

  onDecreaseFontSizeClick() {
    const currentGrid = this.gridApi._nativeElement;
    const fontDetail = this.getFontDetail('-');
    const currentFont = fontDetail.currentFont;
    const newFontCss = fontDetail.newFontCss;
    if (newFontCss === 'font-14' || newFontCss === 'font-50') {
      if (!currentFont) {
        currentGrid.classList.add(newFontCss);
      }
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
      if (!currentFont) {
        currentGrid.classList.add(newFontCss);
      }
    } else {
      currentGrid.classList.add(newFontCss);
      currentGrid.classList.remove(currentFont);
    }
  }

  getFontDetail(newFontOperation) {
    const currentGrid = this.gridApi._nativeElement;
    const classList = [];
    for (const eachClass of currentGrid.classList) {classList.push(eachClass); }
    const currentFont = classList.filter(record => {
      const reg = new RegExp('font-');
      return typeof record === 'string' && record.match(reg);
    })[0];
    const currentFontSize = (currentFont) ? parseInt(currentFont.split('font-')[1], 0) : 14; // default font size
    let newFontSize = (newFontOperation === '+') ? currentFontSize + 1 : currentFontSize - 1;
    if (newFontSize < 14) {
      newFontSize = 14;
    }
    if (newFontSize > 50) {
      newFontSize = 50;
    }
    const newFontCss = (currentFontSize) ? 'font-' + newFontSize : 'font-14';
    return {currentFont, newFontCss};
  }

  onToggleFullScreenClick() {
    const gridWrapperClassList = this.nsAdvanceGridWrapper.classList;
    const activeFullScreen = !gridWrapperClassList.contains('full-screen');
    (activeFullScreen) ? gridWrapperClassList.add('full-screen') : gridWrapperClassList.remove('full-screen');
    this.fullScreenRegularBtnIcon = (activeFullScreen) ? 'fullscreen_exit' : 'fullscreen';
  }

  onColumnSelectorClick() {
    const columnSelectorDialog = this.dialog.open(NgColumnSelectorComponent, {});
    columnSelectorDialog.componentInstance.gridColumnApi = this.gridApi.columnApi;
  }

  onSaveColumnSettingClick() {
    this.gridApi.api.columnController.getColumnState();
    // TODO - Save the column setting;
  }

  onRemoveColumnSettingClick() {
    const userId = 'P4SEH';
    const savedColumnId = 'Something';
    // TODO-This will remove the column setting
  }

  onGroupyByClick() {
    const groupByDialog = this.dialog.open(NgGroupbyGridComponent, {});
    groupByDialog.componentInstance.gridColumnApi = this.gridApi.columnApi;
  }

  onFilterBtnClick() {
    const filterDialog = this.dialog.open(NgFilterModalComponent, {});
    filterDialog.componentInstance.appliedFilterDataEvent.subscribe(result => {
      this.currentFilter = result;
      this.appliedFilterDataEvent.emit(result);
    });
    filterDialog.componentInstance.gridApi = this.gridApi;
    filterDialog.componentInstance.currentlyAppliedFilter = this.currentFilter;
  }

}
