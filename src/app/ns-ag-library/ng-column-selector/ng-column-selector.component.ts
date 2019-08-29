import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ColumnApi} from 'ag-grid-community';

@Component({
  selector: 'app-ng-column-selector',
  templateUrl: './ng-column-selector.component.html',
  styleUrls: ['./ng-column-selector.component.scss']
})
export class NgColumnSelectorComponent implements OnInit {
  @Input() gridColumnApi: ColumnApi;

  unSelectedColumn = [];
  selectedColumn = [];

  sourceCars = [{
    title: 'Something',
    brand: 'something type'
  }];

  targetCars = [{
    title: 'something Again',
    brand: 'not something again'
    }];

  constructor(private dialogRef: MatDialogRef<NgColumnSelectorComponent>) {
  }

  ngOnInit() {
    this.initializeColumnSelectorData();
  }

  initializeColumnSelectorData() {
    const allColumns = this.gridColumnApi.getColumnState();
    for (const column of allColumns) {
      const columnHidden = column.hide;
      if (columnHidden) {
        this.unSelectedColumn.push(column.colId);
      } else {
        this.selectedColumn.push(column.colId);
      }
    }
  }

  onCancelColumnSelectorClick() {
    this.dialogRef.close();
  }

  onSaveColumnSettingClick() {
    const selectedColumn = this.selectedColumn;
    const unSelectedColumn = this.unSelectedColumn;
    for (const [index, record] of selectedColumn) {
        this.gridColumnApi.moveColumn(record, index);
        this.gridColumnApi.setColumnVisible(record, true);
    }
    for (const record of unSelectedColumn) {
      this.gridColumnApi.setColumnVisible(record, false);
    }
    this.dialogRef.close();
  }

}
