import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';

@Component({
  selector: 'naiparq-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  constructor(private dashSrv: DashService) {}

  ngOnInit(): void {}

  numSeq(n: number): Array<number> {
    return this.dashSrv.numSeq(n);
  }
}
