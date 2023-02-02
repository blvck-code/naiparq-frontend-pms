import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  billId: string = '';
  loadingBills: boolean = true;
  billDetails!: any;
  paymentMethod: string = '';
  currentStep: string = 'loading';
  submittingPayment: boolean = false;
  payForm = this.formBuilder.group({
    payment_channel: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
  });

  paymentStatus: string = '';
  billPaid: boolean = false;
  billAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashSrv: DashService,
    private formBuilder: UntypedFormBuilder,
    private sharedSrv: SharedService
  ) {
    this.routeDetails();
  }

  routeDetails(): any {
    const paramMap = this.route.snapshot.params;
    this.billId = paramMap['billId'];
  }

  ngOnInit(): void {
    this.getBillData();
  }

  getBillData(): void {
    this.dashSrv.filterBill(this.billId).subscribe({
      next: (content) => {
        this.loadingBills = false;
        this.billDetails = content.results[0];
        this.currentStep = 'billing';
        this.parkingDuration();
        console.log('Bill content ===>>', content);
      },
      error: (err) => {
        this.sharedSrv.showNotification('Error getting bill', 'error');
        this.loadingBills = false;
        this.currentStep = 'loading';
        this.router.navigate(['/page-not-found']);
      },
    });
  }

  parkingDuration(): any {
    const duration = this.billDetails.parking_duration;
    let wholeHours = Math.floor(+duration);
    let minutes = Math.round((+duration % 1) * 60);

    return {
      hours: wholeHours,
      minutes: minutes,
    };
  }

  // getBillsDetails(): void {
  //   this.dashSrv.getBillings().subscribe({
  //     next: (response) => {
  //       console.log('Bills ==>> ', response);
  //       const driveOut = response.results.find(
  //         (driveOuts) => driveOuts.drive_out === this.billId
  //       );
  //       console.log('Drive out details ==>>', driveOut);
  //       if (driveOut) {
  //         this.loadingBills = false;
  //         this.driveOutDetails = driveOut;
  //         this.currentStep = 'billing';
  //       } else {
  //         this.sharedSrv.showNotification('Error getting bill', 'error');
  //         this.loadingBills = false;
  //         this.currentStep = 'loading';
  //         // this.router.navigate(['/page-not-found']);
  //       }
  //     },
  //     error: (error: any) => {
  //       console.log('Get bill error ===>>', error);
  //       this.sharedSrv.showNotification('Error getting bill', 'error');
  //     },
  //   });
  // }

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
      billId: this.billDetails.id,
    };

    this.dashSrv.paymentDriveOut(payload).subscribe({
      next: (response: {
        payment_channel: string;
        phone_number: string;
        payment_channel_id: string;
      }) => {
        this.submittingPayment = false;
        this.paymentStatus = 'processing';
        console.log('Status on submit ==>>', this.paymentStatus);
        console.log('Bill content ==>>', this.billDetails);
        this.checkingStatus(this.billId);
        this.sharedSrv.showNotification('Processing payment.', 'loading');
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

  checkingStatus(billId: string) {
    const interval = setInterval(() => {
      if (this.paymentStatus === 'processing') {
        console.log('Status processing ==>>', this.paymentStatus);
        this.sharedSrv.showNotification('Processing payment.', 'loading');
        // get new status
        this.dashSrv.filterBill(billId).subscribe({
          next: (response) => {
            this.billPaid = response.results[0].is_paid;
            this.paymentStatus = response.results[0].status;
            this.billAmount = response.results[0].total_amount;
            return;
          },
          error: (err) => {
            console.log('Could not get payment status ==>>', err);
            // todo redirect to error page
            this.sharedSrv.showNotification('Payments failed.', 'error');
            clearInterval(interval);
            return;
          },
        });
      } else if (this.paymentStatus === 'completed' && this.billPaid) {
        // redirect
        this.sharedSrv.showNotification(
          'Payments received successfully.',
          'success'
        );
        console.log('Status completed ==>>', this.paymentStatus);
        this.currentStep = 'complete';
        clearInterval(interval);
        return;
      } else if (this.paymentStatus === 'failed') {
        // redirect to error message
        console.log('Status failed ==>>', this.paymentStatus);
        this.sharedSrv.showNotification('Payments failed.', 'error');
        clearInterval(interval);
        this.currentStep = 'failed';
        return;
      } else {
        // unknown error
        clearInterval(interval);
        return;
      }
    }, 3000);
  }
}
