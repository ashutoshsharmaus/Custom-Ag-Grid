import {Component, Input, OnInit} from '@angular/core';
import {ColDef, ColGroupDef} from 'ag-grid-community/src/ts/entities/colDef';
import {NgAdvanceGridBase} from '../ng-advance-grid/ng-advance-grid.base';

@Component({
  selector: 'app-ns-grid',
  templateUrl: './ns-grid.component.html',
  styleUrls: ['./ns-grid.component.scss']
})
export class NsGridComponent extends NgAdvanceGridBase implements OnInit {
  @Input() columnDefinition: (ColDef | ColGroupDef)[];
  @Input() gridTitle: string;
  @Input() rowData: any[];

  constructor() {
    super();
  }

  ngOnInit() {
  }

  getCustomizeReportingEndpointDetail(): void {
  }

}
