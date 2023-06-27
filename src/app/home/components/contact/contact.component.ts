import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';

export interface ContactRespModel {
  message: {
    email: string;
    full_name: string;
    id: string;
    message: string;
    metadata: {
      message: string;
    };
  };
}

@Component({
  selector: 'naiparq-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  activeFAQ: any;

  submittingForm: boolean = false;
  contactForm = this.formBuilder.group({
    full_name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    private homeSrv: HomeService,
    private formBuilder: FormBuilder,
    private sharedSrv: SharedService
  ) {}

  ngOnInit(): void {}

  handleActiveFAQ(faqId: number): void {
    this.activeFAQ = faqId;
  }
  closeActiveFAQ(): void {
    this.activeFAQ = '';
  }

  motoristsFAQs(): any {
    return this.homeSrv.motoristsFAQs;
  }

  operatorsFAQs(): any {
    return this.homeSrv.operatorsFAQs;
  }

  submit(): any {
    this.submittingForm = true;
    this.homeSrv.contactUs(this.contactForm.value).subscribe({
      next: (resp: ContactRespModel) => {
        console.log(resp);
        this.sharedSrv.showNotification(
          resp.message.metadata.message,
          'success'
        );
        this.contactForm.reset();
        this.submittingForm = false;
      },
      error: (err) => {
        this.submittingForm = false;
        console.log('Failed ==>>', err);
      },
    });
  }
}
