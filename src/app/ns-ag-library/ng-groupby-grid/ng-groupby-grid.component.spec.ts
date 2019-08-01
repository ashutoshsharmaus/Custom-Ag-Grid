import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGroupbyGridComponent } from './ng-groupby-grid.component';

describe('NgGroupbyGridComponent', () => {
  let component: NgGroupbyGridComponent;
  let fixture: ComponentFixture<NgGroupbyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgGroupbyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgGroupbyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
