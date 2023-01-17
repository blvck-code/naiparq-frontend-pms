import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardOneComponent } from './on-board-one.component';

describe('OnBoardOneComponent', () => {
  let component: OnBoardOneComponent;
  let fixture: ComponentFixture<OnBoardOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
