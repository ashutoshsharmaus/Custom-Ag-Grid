import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSampleGridComponent } from './ng-sample-grid.component';

describe('NgSampleGridComponent', () => {
  let component: NgSampleGridComponent;
  let fixture: ComponentFixture<NgSampleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSampleGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSampleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
