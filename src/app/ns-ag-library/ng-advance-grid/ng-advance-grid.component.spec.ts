import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAdvanceGridComponent } from './ng-advance-grid.component';

describe('NgAdvanceGridComponent', () => {
  let component: NgAdvanceGridComponent;
  let fixture: ComponentFixture<NgAdvanceGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAdvanceGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAdvanceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
