import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

// NgRx
import { select, Store } from '@ngrx/store';
import { userInfo } from '../../../auth/state/auth.selector';
import { UserModel } from '../../../auth/model/user.model';
import { Observable } from 'rxjs';

/**
 *  User Accounts Detail
 */
@Component({
  selector: 'naiparq-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private formBuilder: UntypedFormBuilder, private store: Store) {}

  /**
   * User details from the store
   */
  userDetails$: Observable<UserModel> = this.store.pipe(select(userInfo));

  /**
   *  User Information Form to be filled
   */
  userInfoForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    email: ['', Validators.required],
    date_of_birth: [''],
    id_number: [''],
    gender: [''],
  });

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.patchForm();
  }

  /**
   *  Patch form for feeling user info
   */
  patchForm(): void {
    this.userDetails$.subscribe({
      next: (profile) => {
        this.userInfoForm.patchValue({
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone_number: profile.phone_number,
          email: profile.email,
        });
      },
    });
  }
}
