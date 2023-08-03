import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveInComponent } from './drive-in.component';

describe('DriveInComponent', () => {
  let component: DriveInComponent;
  let fixture: ComponentFixture<DriveInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriveInComponent]
    });
    fixture = TestBed.createComponent(DriveInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
