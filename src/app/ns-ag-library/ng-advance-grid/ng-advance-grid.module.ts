import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgAdvanceGridComponent} from './ng-advance-grid.component';
import {NgGridTbarModule} from '../ng-grid-tbar/ng-grid-tbar.module';



@NgModule({
  declarations: [NgAdvanceGridComponent],
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
