import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgAdvanceGridComponent } from './ns-ag-library/ng-advance-grid/ng-advance-grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule, MatFormFieldModule, MatDialogModule, MatOptionModule, MatSelectModule, MatCheckboxModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import { NgColumnSelectorComponent } from './ns-ag-library/ng-column-selector/ng-column-selector.component';
import { NgGridTbarComponent } from './ns-ag-library/ng-grid-tbar/ng-grid-tbar.component';
import { NgShowcaseComponent } from './ng-showcase/ng-showcase.component';
import {NgSampleGridComponent} from './ng-showcase/ng-sample-grid/ng-sample-grid.component';
import {HttpClientModule} from '@angular/common/http';
import { NgGroupbyGridComponent } from './ns-ag-library/ng-groupby-grid/ng-groupby-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NgAdvanceGridComponent,
    NgColumnSelectorComponent,
    NgGridTbarComponent,
    NgShowcaseComponent,
    NgSampleGridComponent,
    NgGroupbyGridComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),

    HttpClientModule,

    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    DragDropModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    NgGroupbyGridComponent,
    NgColumnSelectorComponent
  ]
})
export class AppModule { }
