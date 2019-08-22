import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

class GroupByObject {
  groupById: string;
  columnName: string;
  groupedBy = false;

  constructor(groupById, columnName, groupedBy) {
    this.groupById = groupById;
    this.columnName = columnName;
    this.groupedBy = groupedBy;
  }
}

@Component({
  selector: 'app-ng-groupby-grid',
  templateUrl: './ng-groupby-grid.component.html',
  styleUrls: ['./ng-groupby-grid.component.scss']
})
export class NgGroupbyGridComponent implements OnInit {
  @Input() gridColumnApi: any;
  @ViewChild('groupByRadioGroup', {static: false}) groupByRadioGroup;
  groupByList: Array<GroupByObject> = [];
  groupByForm = new FormControl('');

  constructor(private dialogRef: MatDialogRef<NgGroupbyGridComponent>) {

  }

  ngOnInit() {
    this.populateGroupBy();
  }

  populateGroupBy() {
    const columns = this.gridColumnApi.getAllColumns();
    this.groupByList.push(new GroupByObject(null, 'None', true));
    for (const column of columns) {
      if (column.visible) {
            this.groupByList.push(new GroupByObject(column.colDef.field, column.colDef.headerName, column.rowGroupActive));
          }
    }
  }

  onGroupByClose() {
    this.dialogRef.close();
  }

  onGroupyByApply() {
    if (this.groupByForm.value) {
      this.gridColumnApi.addRowGroupColumn(this.groupByForm.value);
    } else {
      const allGroupBy = this.gridColumnApi.getRowGroupColumns();
      this.gridColumnApi.removeRowGroupColumns(allGroupBy);
    }
  }
}
