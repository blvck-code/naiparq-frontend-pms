import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffVisitorComponent } from './staff-visitor.component';

describe('CashPaymentComponent', () => {
  let component: StaffVisitorComponent;
  let fixture: ComponentFixture<StaffVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffVisitorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
