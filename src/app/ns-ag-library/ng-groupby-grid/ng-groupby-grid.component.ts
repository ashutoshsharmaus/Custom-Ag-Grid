import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';

class GroupByObject {
  groupById: string;
  columnName: string;
  constructor(groupById, columnName) {
    this.groupById = groupById;
    this.columnName = columnName;
  }
}

@Component({
  selector: 'app-ng-groupby-grid',
  templateUrl: './ng-groupby-grid.component.html',
  styleUrls: ['./ng-groupby-grid.component.scss']
})
export class NgGroupbyGridComponent implements OnInit {
  tempVariable = 'hola';

  @ViewChild('groupByRadioGroup', {static: false}) groupByRadioGroup;
  groupByList: Array<GroupByObject> = [];
  groupByNewList = [];
  @Input() gridColumnApi: any;

  constructor(private dialogRef: MatDialogRef<NgGroupbyGridComponent>) { }

  ngOnInit() {
    this.populateGroupBy();
  }

  populateGroupBy() {
    const columns = this.gridColumnApi.getAllColumns();
    columns.forEach(column => {
      if (column.visible) {
        const groupByItem = new GroupByObject(column.colDef.field, column.colDef.headerName);
        this.groupByList.push(groupByItem);
        this.groupByNewList.push({field: column.colDef.field, name: column.colDef.headerName});
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
