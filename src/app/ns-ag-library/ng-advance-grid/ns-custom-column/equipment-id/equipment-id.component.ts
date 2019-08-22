import {Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
  selector: 'app-equipment-id',
  templateUrl: './equipment-id.component.html',
  styleUrls: ['./equipment-id.component.scss']
})
export class EquipmentIdComponent implements ICellRendererAngularComp {
  templateContext: { $implicit: any, params: any };
  equipmentId: string;
  watchlistIcon: string;

  hideButton = false;

  constructor() { }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  agInit(params: ICellRendererParams): void {
    this.equipmentId = params.getValue();
    (!params.getValue()) ? this.hideButton = true : this.hideButton = false;
    if (params.getValue()) { this.applyWatchlistIcon(); }
    this.refresh(params);
  }

  refresh(params: any): boolean {
    this.templateContext = {
      $implicit: params.data,
      params
    };
    return true;
  }

  onWatchListClick() {
    this.watchlistIcon =  (this.watchlistIcon === 'star') ? 'star_border' :  'star';
  }

  applyWatchlistIcon() {
    (this.checkOnWatch()) ? this.watchlistIcon = 'star' : this.watchlistIcon = 'star_border';
  }

  checkOnWatch() {
    const savedWatchList = ['dsasdfa', 35000, 72000];
    return (savedWatchList.indexOf(this.equipmentId) === 0);
  }

  onEquipmentIdClick() {
    alert('You clicked: ' + this.equipmentId);
  }
}
