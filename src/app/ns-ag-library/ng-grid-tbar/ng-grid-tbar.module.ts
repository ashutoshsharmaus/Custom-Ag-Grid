import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatOptionModule,
  MatRadioModule, MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgGridTbarComponent} from './ng-grid-tbar.component';



@NgModule({
  declarations: [NgGridTbarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
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
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    DragDropModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    NgGridTbarComponent
  ]
})
export class NgGridTbarModule { }
