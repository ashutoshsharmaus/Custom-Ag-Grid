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

  /**
   *  The function will listen for the keyup event and if enter is pressed than
   *  it will setQuickFilter with the typed value.
   * @param event: Keypup event;
   */
  onAdvanceSearchType(event) {
    if (event.key === 'Enter') {
      const typedValue = event.currentTarget.value;
      this.gridApi.api.setQuickFilter(typedValue);
    }
  }

  /**
   * The function will expand all the groupy for the grid
   */
  onGroupByPlus() {
    this.gridApi.api.expandAll();
  }

  /**
   * The function will collapse all the groupy for the grid
   */
  onGroupByMinus() {
    this.gridApi.api.collapseAll();
  }

  /**
   * The function will export the current grid data to excel.
   */
  onGridExportExcelClick() {
    this.gridApi.api.exportDataAsExcel();
  }

  /**
   * The function will first set the grid to print friendly.
   * Than it will print the document and reset back the view to
   * it's original state.
   */
  onGridPrintPdfClick() {
    this.setPrinterFriendly();
    print();
  }

  /**
   *  THe function get the current grid and set the grid to it's DOM Layout
   */
  setPrinterFriendly() {
    const currentGrid = this.gridApi.api;
    currentGrid.setDomLayout('print');
  }

  /**
   * The grid will get teh current grid font-size and decrease the font-size
   * by 1 px until it is 14 pixel.
   */
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

  /**
   * The grid will get teh current grid font-size and increase the font-size
   * by 1 px until it is 50 pixel.
   */
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

  /**
   * The function will check the current font-size and give you
   * new font-size depending on the input params.
   * @param newFontOperation: The variable inupt can be '+' or '-'
   */
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

  /**
   * The function will apply/remove the css 'full-screen' grid wrapper that surrounds the
   * title bar, ag-grid and the footer content.
   * The 'full-screen' css is defined in the ng-advance-grid
   */
  onToggleFullScreenClick() {
    const gridWrapperClassList = this.nsAdvanceGridWrapper.classList;
    const activeFullScreen = !gridWrapperClassList.contains('full-screen');
    (activeFullScreen) ? gridWrapperClassList.add('full-screen') : gridWrapperClassList.remove('full-screen');
    this.fullScreenRegularBtnIcon = (activeFullScreen) ? 'fullscreen_exit' : 'fullscreen';
  }

  /**
   * The function will open the Column Selector Component and pass the grid column api to the modal.
   */
  onColumnSelectorClick() {
    const columnSelectorDialog = this.dialog.open(NgColumnSelectorComponent, {});
    columnSelectorDialog.componentInstance.gridColumnApi = this.gridApi.columnApi;
    columnSelectorDialog.componentInstance.gridApi = this.gridApi;
  }

  /**
   * This method will get the current state of the grid and
   * save the column setting in the database.
   */
  onSaveColumnSettingClick() {
    this.gridApi.api.columnController.getColumnState();
    // TODO - Save the column setting;
  }

  /**
   * This will remove the grid column setting by passing the unique grid Id.
   */
  onRemoveColumnSettingClick() {
    // TODO-This will remove the column setting
  }

  /**
   * This will open the group By Dialog box and pass the columnApi to the group by modal
   */
  onGroupyByClick() {
    const groupByDialog = this.dialog.open(NgGroupbyGridComponent, {});
    groupByDialog.componentInstance.gridColumnApi = this.gridApi.columnApi;
  }

  /**
   * The follow function opens the filter modal.
   * It also passes the currentFilter result to the filter modal and the grid API
   */
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
