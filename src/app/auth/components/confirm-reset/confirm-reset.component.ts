import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'naiparq-confirm-reset',
  templateUrl: './confirm-reset.component.html',
  styleUrls: ['./confirm-reset.component.scss'],
})
export class ConfirmResetComponent implements OnInit {
  /**
   *
   * @param authSrv Imported auth service
   *
   * Imported auth services
   */
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {}

  /**
   *  Takes in link as a parameter and opens that link
   *
   * @param { string } target link to the to be redirected to
   *
   * @returns Redirects page
   *
   */
  redirectRoute(link: string): void {
    this.authSrv.redirectRoute(link);
  }
}
