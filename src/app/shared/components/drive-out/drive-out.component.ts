import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drive-out',
  templateUrl: './drive-out.component.html',
  styleUrls: ['./drive-out.component.scss'],
})
export class DriveOutComponent implements OnInit {
  @ViewChild('radioInput') 'radioInput': ElementRef;
  stepOne: boolean = false;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  stepFour: boolean = false;
  stepFive: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  handleSubmitPlate(): void {
    this.stepOne = false;
    this.stepTwo = true;
  }

  handleCheckRadio(): void {
    const input = this.radioInput.nativeElement;
    input.click();
    console.log(input);
  }
}
