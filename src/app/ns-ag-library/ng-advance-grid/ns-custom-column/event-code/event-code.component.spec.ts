import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCodeComponent } from './event-code.component';

describe('EventCodeComponent', () => {
  let component: EventCodeComponent;
  let fixture: ComponentFixture<EventCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
