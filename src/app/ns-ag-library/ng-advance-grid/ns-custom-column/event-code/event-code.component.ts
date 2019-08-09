import {Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-event-code',
  templateUrl: './event-code.component.html',
  styleUrls: ['./event-code.component.scss']
})
export class EventCodeComponent implements ICellRendererAngularComp {
  templateContext: { $implicit: any, params: any };

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }

  refresh(params: any): boolean {
    this.templateContext = {
      $implicit: params.data,
      params
    };
    return true;
  }
}
