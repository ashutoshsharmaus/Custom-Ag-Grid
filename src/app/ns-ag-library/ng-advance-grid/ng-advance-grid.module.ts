import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgAdvanceGridComponent} from './ng-advance-grid.component';
import {NgGridTbarModule} from '../ng-grid-tbar/ng-grid-tbar.module';
import { EquipmentIdComponent } from './ns-custom-column/equipment-id/equipment-id.component';



@NgModule({
  declarations: [NgAdvanceGridComponent, EquipmentIdComponent],
  imports: [
    CommonModule,
    NgGridTbarModule,
  ],
  exports: [
    NgGridTbarModule,
    NgAdvanceGridComponent
  ]
})
export class NgAdvanceGridModule { }
