import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';

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
  @ViewChild('groupByRadioGroup', {static: false}) groupByRadioGroup;
  groupByList: Array<GroupByObject> = [];
  @Input() gridColumnApi: any;

  constructor(private dialogRef: MatDialogRef<NgGroupbyGridComponent>) { }

  ngOnInit() {
    this.populateGroupBy();
  }

  populateGroupBy() {
    const columns = this.gridColumnApi.getAllColumns();
    columns.forEach(column => {
      if (column.visible) {
        this.groupByList.push(new GroupByObject(column.colDef.field, column.colDef.headerName, column.rowGroupActive));
      }
    });
  }

  onGroupByClose() {
    this.dialogRef.close();
  }

  onGroupyByApply() {
    debugger;
    this.gridColumnApi.addRowGroupColumn();
  }
}
