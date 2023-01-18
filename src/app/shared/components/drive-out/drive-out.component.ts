import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drive-out',
  templateUrl: './drive-out.component.html',
  styleUrls: ['./drive-out.component.scss'],
})
export class DriveOutComponent implements OnInit {
  @ViewChild('radioInput') 'radioInput': ElementRef;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  stepFour: boolean = false;
  stepFive: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleSubmitPlate(): void {
    this.stepOne = false;
    this.stepTwo = true;

    // setTimeout(() => {
    //   this.stepOne = false;
    //   this.stepTwo = false;
    //   this.stepThree = true;
    //   this.stepFour = false;
    //   this.stepFive = false;
    // }, 2000);
    //
    // setTimeout(() => {
    //   this.stepOne = false;
    //   this.stepTwo = false;
    //   this.stepThree = false;
    //   this.stepFour = true;
    //   this.stepFive = false;
    // }, 4000);
    //
    // setTimeout(() => {
    //   this.stepOne = false;
    //   this.stepTwo = false;
    //   this.stepThree = false;
    //   this.stepFour = false;
    //   this.stepFive = true;
    // }, 6000);
  }

  handleCheckRadio(): void {
    const input = this.radioInput.nativeElement;
    input.click();
    console.log(input);
  }
}
