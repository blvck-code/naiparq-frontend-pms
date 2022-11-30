import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristManagementComponent } from './motorist-management.component';

describe('MotoristManagementComponent', () => {
  let component: MotoristManagementComponent;
  let fixture: ComponentFixture<MotoristManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotoristManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoristManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
