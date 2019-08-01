import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgColumnSelectorComponent } from './ng-column-selector.component';

describe('NgColumnSelectorComponent', () => {
  let component: NgColumnSelectorComponent;
  let fixture: ComponentFixture<NgColumnSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgColumnSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
