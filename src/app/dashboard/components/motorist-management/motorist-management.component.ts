import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'naiparq-motorist-management',
  templateUrl: './motorist-management.component.html',
  styleUrls: ['./motorist-management.component.scss'],
})
export class MotoristManagementComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
