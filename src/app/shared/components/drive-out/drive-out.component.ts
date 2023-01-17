import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive-out',
  templateUrl: './drive-out.component.html',
  styleUrls: ['./drive-out.component.scss'],
})
export class DriveOutComponent implements OnInit {
  stepOne: boolean = true;
  stepTwo: boolean = true;
  stepThree: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
