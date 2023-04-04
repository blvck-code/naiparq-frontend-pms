import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'naiparq-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  resetForm = this.fb.group({
    phone_number: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
  });
  submitting: boolean = false;

  constructor(
    private sharedSrv: SharedService,
    private fb: UntypedFormBuilder,
    private authSrv: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  isValid(fieldName: any): boolean {
    return (
      this.resetForm.controls[fieldName].invalid &&
      (this.resetForm.controls[fieldName].dirty ||
        this.resetForm.controls[fieldName].touched)
    );
  }

  redirectRoute(link: string): void {
    this.authSrv.redirectRoute(link);
  }

  resetSubmit(): void {
    this.submitting = true;

    this.authSrv.resetPass(this.resetForm.value).subscribe({
      next: (resp: { message: string }) => {
        this.submitting = false;
        this.sharedSrv.showNotification(resp.message, 'success');
        this.resetForm.reset();
        this.router.navigate(['/auth/confirm_reset']);
      },
      error: (err: { message: string; status: number }) => {
        this.submitting = false;
        this.sharedSrv.showNotification(err.message, 'error');
      },
    });
  }
}
