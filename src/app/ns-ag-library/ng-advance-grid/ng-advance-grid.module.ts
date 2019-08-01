import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material';
import {NgAdvanceGridComponent} from './ng-advance-grid.component';



@NgModule({
  declarations: [NgAdvanceGridComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [NgAdvanceGridComponent]
})
export class NgAdvanceGridModule { }
