import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveOutComponent } from './drive-out.component';

describe('DriveOutComponent', () => {
  let component: DriveOutComponent;
  let fixture: ComponentFixture<DriveOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
