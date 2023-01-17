import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardThreeComponent } from './on-board-three.component';

describe('OnBoardThreeComponent', () => {
  let component: OnBoardThreeComponent;
  let fixture: ComponentFixture<OnBoardThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
