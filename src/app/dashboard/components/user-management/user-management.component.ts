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
  }

  // Check password match
  checkPassword(): boolean {
    const password1 = this.userForm.get('password1')?.value;
    const password2 = this.userForm.get('password2')?.value;

    return password1 === password2;
  }

  // Submit create new user
  onSubmitCreateUser(): void {
    // Check form valid
    if (this.userForm.invalid) {
      this.formInvalid = true;
      this.sharedSrv.showNotification(
        'Please fill the whole form to continue!',
        'error'
      );
      return;
    }

    // Check passwords match
    if (!this.checkPassword()) {
      this.formInvalid = true;
      this.sharedSrv.showNotification('Passwords do not match!', 'error');
      return;
    }

    // Either submit to create new parking attendant or new blogger
    if (this.userType === 'blogger') {
      this.dashSrv.createBlogger(this.userForm.value).subscribe({
        next: (resp) => {
          this.sharedSrv.showNotification(
            'Blogger created successfully.',
            'success'
          );
          // Todo add created user to store
          this.userForm.reset();
        },
        error: (err) => {
          this.sharedSrv.showNotification('Failed to create blogger', 'error');
          console.log('Failed create blogger ==>>', err);
        },
      });
    } else if (this.userType === 'parking_attendant') {
      // Else create parking attendant
      this.dashSrv.createParkingAttendant(this.userForm.value).subscribe({
        next: (resp) => {
          this.sharedSrv.showNotification(
            'Parking attendant created successfully.',
            'success'
          );
          // Todo add created user to store
          this.userForm.reset();
        },
        error: (err: { message: string; status: number }) => {
          this.sharedSrv.showNotification(err.message, 'error');
          console.log('Failed create Parking attendant ==>>', err);
        },
      });
    } else {
      this.sharedSrv.showNotification('User role not selected!', 'error');
    }
  }

  numSeq(n: number): Array<number> {
    return this.dashSrv.numSeq(n);
  }
}
