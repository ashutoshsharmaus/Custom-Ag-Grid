import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGridTbarComponent } from './ng-grid-tbar.component';

describe('NgGridTbarComponent', () => {
  let component: NgGridTbarComponent;
  let fixture: ComponentFixture<NgGridTbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgGridTbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgGridTbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
