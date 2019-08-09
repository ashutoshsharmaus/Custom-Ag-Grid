import {Component, TemplateRef} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
  selector: 'app-equipment-id',
  templateUrl: './equipment-id.component.html',
  styleUrls: ['./equipment-id.component.scss']
})
export class EquipmentIdComponent implements ICellRendererAngularComp {
  template: TemplateRef<any>;
  templateContext: { $implicit: any, params: any };

  constructor() { }

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

  onEquipmentIdClick(params) {
    debugger;
  }
}
