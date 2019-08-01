import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgShowcaseComponent } from './ng-showcase.component';

describe('NgShowcaseComponent', () => {
  let component: NgShowcaseComponent;
  let fixture: ComponentFixture<NgShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
