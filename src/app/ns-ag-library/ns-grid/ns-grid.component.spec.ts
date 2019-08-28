import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsGridComponent } from './ns-grid.component';

describe('NsGridComponent', () => {
  let component: NsGridComponent;
  let fixture: ComponentFixture<NsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
