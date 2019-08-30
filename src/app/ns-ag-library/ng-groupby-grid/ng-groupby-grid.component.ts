import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ColumnApi} from 'ag-grid-community';

@Component({
  selector: 'app-ng-groupby-grid',
  templateUrl: './ng-groupby-grid.component.html',
  styleUrls: ['./ng-groupby-grid.component.scss']
})
export class NgGroupbyGridComponent implements OnInit {
  @Input() gridColumnApi: ColumnApi;
  @ViewChild('groupByRadioGroup', {static: false}) groupByRadioGroup;
  groupByForm = new FormControl('');

  constructor(private dialogRef: MatDialogRef<NgGroupbyGridComponent>) {

  }

  ngOnInit() {
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
      const removeGroupByColumn = (allGroupBy.length > 0) ? allGroupBy[allGroupBy.length - 1 ] : null;
      this.gridColumnApi.removeRowGroupColumns([removeGroupByColumn]);
    }
  }
}
