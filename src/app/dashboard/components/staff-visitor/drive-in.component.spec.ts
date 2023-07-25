import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveInComponent } from './drive-in.component';

describe('CashPaymentComponent', () => {
  let component: DriveInComponent;
  let fixture: ComponentFixture<DriveInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriveInComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
