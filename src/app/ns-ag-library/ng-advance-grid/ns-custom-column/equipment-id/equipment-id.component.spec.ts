import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentIdComponent } from './equipment-id.component';

describe('EquipmentIdComponent', () => {
  let component: EquipmentIdComponent;
  let fixture: ComponentFixture<EquipmentIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
