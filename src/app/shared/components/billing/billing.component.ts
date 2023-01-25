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
  driveOutId: string = '';
  loadingBills: boolean = true;
  driveOutDetails!: BillingModel;
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
          this.sharedSrv.showNotification('Error getting bill', 'error');
          this.loadingBills = false;
          this.currentStep = 'loading';
          this.router.navigate(['/page-not-found']);
        }
      },
      error: (error: any) => {
        console.log('Get bill error ===>>', error);
        this.sharedSrv.showNotification('Error getting bill', 'error');
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
        console.log('Status on submit ==>>', this.paymentStatus);
        this.checkingStatus(this.driveOutDetails.id);
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
            this.billPaid = response.is_paid;
            this.paymentStatus = response.status;
            this.billAmount = response.total_amount;
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

    // if (this.paymentStatus === 'processing') {
    //   setInterval(() => {
    //     if (this.paymentStatus === 'completed' && this.billPaid) {
    //       clearInterval();
    //       this.sharedSrv.showNotification(
    //         'Payments received successfully.',
    //         'success'
    //       );
    //       this.currentStep = 'complete';
    //       return;
    //     } else if (this.paymentStatus === 'failed') {
    //       this.sharedSrv.showNotification(
    //         'Failed to confirm your payment.',
    //         'error'
    //       );
    //       clearInterval();
    //       // Todo redirect to failed page
    //       // Todo bug when user enters wrong mpesa pin
    //       return;
    //     }
    //     if (this.paymentStatus !== 'processing') {
    //       clearInterval();
    //       return;
    //     }
    //     this.dashSrv.filterBill(billId).subscribe({
    //       next: (response) => {
    //         this.billPaid = response.is_paid;
    //         this.paymentStatus = response.status;
    //         this.billAmount = response.total_amount;
    //         console.log('Bill response ===>>>', response);
    //         clearInterval();
    //         return;
    //       },
    //       error: (err) => {
    //         console.log('Could not get payment status ==>>', err);
    //         // todo redirect to error page
    //         clearInterval();
    //         return;
    //       },
    //     });
    //   }, 4000);
    // } else if (this.paymentStatus === 'failed') {
    //   // Todo redirect to error response
    //   this.sharedSrv.showNotification(
    //     'Failed to confirm your payment.',
    //     'error'
    //   );
    // } else if (this.paymentStatus === 'completed' && this.billPaid) {
    //   // Todo is completed
    //   this.sharedSrv.showNotification(
    //     'Payments received successfully.',
    //     'success'
    //   );
    //   this.currentStep = 'complete';
    // }
  }
}
