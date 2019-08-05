import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatOptionModule,
  MatRadioModule, MatSelectModule, MatTooltipModule
} from '@angular/material';
import {NgAdvanceGridComponent} from './ng-advance-grid.component';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [NgAdvanceGridComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    DragDropModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    DragDropModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    NgAdvanceGridComponent
  ]
})
export class NgAdvanceGridModule { }
