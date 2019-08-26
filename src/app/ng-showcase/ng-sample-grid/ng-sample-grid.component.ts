import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EquipmentIdComponent} from '../../ns-ag-library/ng-advance-grid/ns-custom-column/equipment-id/equipment-id.component';
import {EventCodeComponent} from '../../ns-ag-library/ng-advance-grid/ns-custom-column/event-code/event-code.component';
import DummyJSON from '../../../assets/dummy/DummyJson.json';
import {NgAdvanceGridBase} from '../../ns-ag-library/ng-advance-grid/ng-advance-grid.base';

@Component({
  selector: 'app-ng-sample-grid',
  templateUrl: './ng-sample-grid.component.html',
  styleUrls: ['./ng-sample-grid.component.scss']
})
export class NgSampleGridComponent extends NgAdvanceGridBase implements OnInit {
  gridTitle = 'Pacesetter Grid';
  getRowHeight = 80;
  columnDefinition = [
    {
      headerName: 'Equipment Id',
      field: 'equipmentId',
      cellRendererFramework: EquipmentIdComponent,
    },
    {
      headerName: 'Event Code',
      field: 'eventCode',
      cellRendererFramework: EventCodeComponent,
    },
    {
      headerName: 'make',
      field: 'make',
      sortable: true,
      filter: true,
      filterCategory: 'Description'
    },
    {
      headerName: 'model',
      field: 'model',
      sortable: true,
      filter: true,
      width: 300,
      enableRowGroup: true,
      filterCategory: 'Description'
    },
    {
      headerName: 'price',
      field: 'price',
      sortable: true,
      filter: true,
      enableRowGroup: true,
      width: 300
    }
  ];

  constructor(private http: HttpClient) {
    super();
    this.getCustomizeReportingEndpointDetail();
  }

  ngOnInit() {
    this.rowData =  DummyJSON;
    // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

  getCustomizeReportingEndpointDetail(): void {
    console.log('ok I have implemented this method');
  }
}
