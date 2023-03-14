import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'naiparq-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  userType: string = '';
  isSubmitting: boolean = false;
  formInvalid: boolean = false;

  userForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    email: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  });

  constructor(
    private dashSrv: DashService,
    private fb: UntypedFormBuilder,
    private sharedSrv: SharedService
  ) {}

  ngOnInit(): void {}

  // Determines the user type chosen
  handleUserType(event: any): void {
    this.userType = event.target.value;
    console.log('Event ==>>', event.target.value);
  }

  onSubmitCreateUser(): void {
    if (this.userForm.invalid) {
      this.formInvalid = true;
      this.sharedSrv.showNotification(
        'Please fill the whole form to continue!',
        'error'
      );
      return;
    }
    // Todo check if passwords match
    // Todo check if you already exists error handler

    console.log('Validates ==>>', this.userForm.value);
  }

  numSeq(n: number): Array<number> {
    return this.dashSrv.numSeq(n);
  }
}
