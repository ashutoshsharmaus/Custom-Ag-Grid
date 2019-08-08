import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import {
 MatCheckboxModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgColumnSelectorComponent } from './ns-ag-library/ng-column-selector/ng-column-selector.component';
import { NgShowcaseComponent } from './ng-showcase/ng-showcase.component';
import {NgSampleGridComponent} from './ng-showcase/ng-sample-grid/ng-sample-grid.component';
import {HttpClientModule} from '@angular/common/http';
import { NgGroupbyGridComponent } from './ns-ag-library/ng-groupby-grid/ng-groupby-grid.component';
import {NgAdvanceGridModule} from './ns-ag-library/ng-advance-grid/ng-advance-grid.module';
import { NgFilterModalComponent } from './ns-ag-library/ng-filter-modal/ng-filter-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NgColumnSelectorComponent,
    NgShowcaseComponent,
    NgSampleGridComponent,
    NgGroupbyGridComponent,
    NgFilterModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgAdvanceGridModule,
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    NgGroupbyGridComponent,
    NgColumnSelectorComponent,
    NgFilterModalComponent,
  ]
})
export class AppModule { }
