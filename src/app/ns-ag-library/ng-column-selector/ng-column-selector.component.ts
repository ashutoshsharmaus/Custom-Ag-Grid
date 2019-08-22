import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ng-column-selector',
  templateUrl: './ng-column-selector.component.html',
  styleUrls: ['./ng-column-selector.component.scss']
})
export class NgColumnSelectorComponent implements OnInit {
  @Input() gridColumnApi: any;

  unSelectedColumn = [];
  selectedColumn = [];

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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onLeftClick() {
    // transferArrayItem(this.selectedColumn, this.selectedColumn, 0, 0);
  }

  onRightClick() {
  }

  onUpClick() {
  }

  onDownClick() {
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

    unSelectedColumn.forEach(function(record) {
      this.setColumnVisible(record, false);
    }, this.gridColumnApi);
    this.dialogRef.close();
  }

}
