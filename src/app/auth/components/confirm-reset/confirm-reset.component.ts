import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'naiparq-confirm-reset',
  templateUrl: './confirm-reset.component.html',
  styleUrls: ['./confirm-reset.component.scss'],
})
export class ConfirmResetComponent implements OnInit {
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {}

  redirectRoute(link: string): void {
    this.authSrv.redirectRoute(link);
  }
}
