import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgAdvanceGridBaseController} from '../../ns-ag-library/ng-advance-grid/ng-advance-grid-base-controller';
import {EquipmentIdComponent} from '../../ns-ag-library/ng-advance-grid/ns-custom-column/equipment-id/equipment-id.component';

@Component({
  selector: 'app-ng-sample-grid',
  templateUrl: './ng-sample-grid.component.html',
  styleUrls: ['./ng-sample-grid.component.scss']
})
export class NgSampleGridComponent extends NgAdvanceGridBaseController implements OnInit {
  gridTitle = 'Pacesetter Grid';
  columnDefinition = [
    {
      headerName: 'make',
      field: 'make', sortable: true,
      filter: true,
      enableRowGroup: true,
      // checkboxSelection: true,
      // rowGroup: true
    },
    {
      headerName: 'model',
      field: 'model',
      sortable: true,
      filter: true,
      width: 300,
      enableRowGroup: true,
    },
    {
      headerName: 'price',
      field: 'price',
      sortable: true,
      filter: true,
      enableRowGroup: true,
      width: 300
    },
    {
      headerName: 'Equipment Id',
      field: 'price',
      cellRendererFramework: EquipmentIdComponent,
    }
  ];

  autoGroupColumnDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  };

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

}
