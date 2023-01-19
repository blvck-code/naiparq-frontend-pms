import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashService } from '../../../dashboard/services/dash.service';
import { SharedService } from '../../services/shared.service';
import { BillingModel } from '../../../dashboard/models/billing.model';

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
  currentStep: string = 'billing';

  constructor(
    private route: ActivatedRoute,
    private dashSrv: DashService,
    private sharedSrv: SharedService
  ) {
    this.routeDetails();
  }

  routeDetails(): any {
    const paramMap = this.route.snapshot.params;
    this.driveOutId = paramMap['driveOutSlug'];

    console.log('Route details ===>>>', paramMap['driveOutSlug']);
    console.log('Drive out URL ===>>>', this.driveOutId);
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
    // setTimeout(() => {
    //   this.currentStep = 'mpesa';
    // }, 500);
  }
}
