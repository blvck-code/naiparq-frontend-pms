import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardTwoComponent } from './on-board-two.component';

describe('OnBoardTwoComponent', () => {
  let component: OnBoardTwoComponent;
  let fixture: ComponentFixture<OnBoardTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
