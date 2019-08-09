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
    this.applyWatchlistIcon();
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
    this.watchlistIcon =  (this.watchlistIcon === 'start') ? 'star_border' :  'start';
  }

  applyWatchlistIcon() {
    const something = (Math.random() * 100 >= 50);
    (something) ? this.watchlistIcon = 'star' : this.watchlistIcon = 'star_border';
  }

  onEquipmentIdClick(params) {
    const equipmentId = params.currentTarget.attributes['equipment-id'].value;
    alert('You clicked: ' + equipmentId);
  }
}
