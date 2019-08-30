import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ColumnApi} from 'ag-grid-community';

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
  @Input() gridColumnApi: ColumnApi;
  @ViewChild('groupByRadioGroup', {static: false}) groupByRadioGroup;
  groupByList: Array<GroupByObject> = [];
  groupByForm = new FormControl('');

  constructor(private dialogRef: MatDialogRef<NgGroupbyGridComponent>) {

  }

  ngOnInit() {
    debugger;
    this.populateGroupBy();
  }

  /**
   * This method is called in the init of the function.
   * It will get the list of all the visible columns in the grid and
   * populate the groupByList object
   */
  populateGroupBy() {
    const columns = this.gridColumnApi.getAllColumns();
    this.groupByList.push(new GroupByObject(null, 'None', true));
    for (const column of columns) {
      if (column.isVisible()) {
            this.groupByList.push(new GroupByObject(column.getColDef().field, column.getColDef().headerName, column.isRowGroupActive()));
          }
    }
  }

  /**
   *  Closes the Group By dialog box.
   */
  onGroupByClose() {
    this.dialogRef.close();
  }

  /**
   * Applied the Group By by getting the currently selected group by option.
   */
  onGroupyByApply(): void {
    if (this.groupByForm.value) {
      this.gridColumnApi.addRowGroupColumn(this.groupByForm.value);
    } else {
      const allGroupBy = this.gridColumnApi.getRowGroupColumns();
      this.gridColumnApi.removeRowGroupColumns(allGroupBy);
    }
  }
}
