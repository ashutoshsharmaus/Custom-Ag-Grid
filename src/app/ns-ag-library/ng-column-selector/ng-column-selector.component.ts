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

  visibleColumns = [];
  hiddenColumns = [];

  constructor(private dialogRef: MatDialogRef<NgColumnSelectorComponent>) {
  }

  ngOnInit() {
    this.initializeColumnSelectorData();
  }

  initializeColumnSelectorData() {
    const allColumns = this.gridColumnApi.getAllColumns();
    const columnReference = new Map();
    for (const column of allColumns) {
      columnReference.set(column.getId(), column);
    }

    const columnState = this.gridColumnApi.getColumnState();
    for (const column of columnState) {
      if (column.hide) {
        this.hiddenColumns.push(columnReference.get(column.colId));
      } else {
        this.visibleColumns.push(columnReference.get(column.colId));
      }
    }
  }

  onCancelColumnSelectorClick() {
    this.dialogRef.close();
  }

  onSaveColumnSettingClick() {
    let visibleColumnIndex = 0;
    debugger;
    for (const record of this.visibleColumns) {
      this.gridColumnApi.moveColumn(record, visibleColumnIndex);
      this.gridColumnApi.setColumnVisible(record, true);
      visibleColumnIndex ++;
    }

    for (const record of this.hiddenColumns) {
      this.gridColumnApi.setColumnVisible(record.columnId, false);
    }
    this.dialogRef.close();
  }

}
