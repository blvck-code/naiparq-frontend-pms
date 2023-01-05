import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private formBuilder: UntypedFormBuilder) {}

  userInfoForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    email: ['', Validators.required],
    date_of_birth: [''],
    id_number: [''],
    gender: [''],
  });

  ngOnInit(): void {}
}
