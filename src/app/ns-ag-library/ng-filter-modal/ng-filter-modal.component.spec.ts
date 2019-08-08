import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFilterModalComponent } from './ng-filter-modal.component';

describe('NgFilterModalComponent', () => {
  let component: NgFilterModalComponent;
  let fixture: ComponentFixture<NgFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
