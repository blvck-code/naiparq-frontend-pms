import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashService } from '../../../dashboard/services/dash.service';
import { SharedService } from '../../services/shared.service';
import { BillingModel } from '../../../dashboard/models/billing.model';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  driveOutId: string = '';
  loadingBills: boolean = true;
  driveOutDetails!: BillingModel;
  paymentMethod: string = '';
  currentStep: string = 'loading';
  paymentStatus: string = '';
  submittingPayment: boolean = false;
  payForm = this.formBuilder.group({
    payment_channel: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private dashSrv: DashService,
    private formBuilder: UntypedFormBuilder,
    private sharedSrv: SharedService
  ) {
    this.routeDetails();
  }

  routeDetails(): any {
    const paramMap = this.route.snapshot.params;
    this.driveOutId = paramMap['driveOutSlug'];
  }

  ngOnInit(): void {
    this.getBillsDetails();
  }

  getBillsDetails(): void {
    this.dashSrv.getBillings().subscribe({
      next: (response) => {
        console.log('Bills ==>> ', response);
        const driveOut = response.results.find(
          (driveOuts) => driveOuts.drive_out === this.driveOutId
        );
        console.log('Drive out details ==>>', driveOut);
        if (driveOut) {
          this.loadingBills = false;
          this.driveOutDetails = driveOut;
          this.currentStep = 'billing';
        } else {
          this.sharedSrv.showNotification('Billing error', 'error');
          this.loadingBills = false;
          this.currentStep = 'loading';
        }
      },
      error: (error: any) => {
        console.log('Get bill error ===>>', error);
      },
    });
  }

  handlePaymentMethod(payOption: any): void {
    this.paymentMethod = payOption;
    this.payForm.patchValue({
      payment_channel: this.paymentMethod,
    });
    setTimeout(() => {
      this.currentStep = 'M-Pesa';
    }, 500);
  }

  submitPayment(): void {
    console.log('Form data ==>>', this.payForm.value);
    if (!this.payForm.valid) {
      this.sharedSrv.showNotification(
        'Please enter your phone number',
        'error'
      );
      return;
    }
    this.submittingPayment = true;

    const payload = {
      ...this.payForm.value,
      billId: this.driveOutDetails.id,
    };

    this.dashSrv.paymentDriveOut(payload).subscribe({
      next: (response: {
        payment_channel: string;
        phone_number: string;
        payment_channel_id: string;
      }) => {
        this.submittingPayment = false;
        this.paymentStatus = 'processing';
        if (this.paymentStatus === 'processing') {
          this.sharedSrv.showNotification('Processing payment.', 'loading');
          setInterval(() => {
            this.getStatus();
          }, 3000);
        } else if (this.paymentStatus === 'completed') {
          this.sharedSrv.showNotification('Payment received', 'success');
          setTimeout(() => {
            this.currentStep = 'complete';
          }, 1000);
        }
      },
      error: (err) => {
        this.submittingPayment = false;
        console.log('Error paying ==>>', err);
        this.sharedSrv.showNotification(
          'Your payment could not go through, please try again',
          'error'
        );
      },
    });
  }

  getStatus(): void {
    if (this.paymentStatus === 'processing') {
      this.dashSrv.getBillings().subscribe({
        next: (response) => {
          const driveOut = response.results.find(
            (driveOuts) => driveOuts.drive_out === this.driveOutId
          );
          if (driveOut) {
            console.log('Drive out details ==>>', driveOut);
            this.paymentStatus = driveOut.status;
          } else {
            this.sharedSrv.showNotification('Billing error', 'error');
            this.loadingBills = false;
            this.currentStep = 'loading';
          }
        },
        error: (error: any) => {
          console.log('Get bill error ===>>', error);
        },
      });
    }
    setTimeout(() => {
      this.paymentStatus = 'completed';
      this.sharedSrv.showNotification('Payment received', 'success');
      setTimeout(() => {
        this.currentStep = 'complete';
      }, 1000);
    }, 8000);
  }
}
