import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets-management',
  templateUrl: './assets-management.component.html',
  styleUrls: ['./assets-management.component.scss'],
})
export class AssetsManagementComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
