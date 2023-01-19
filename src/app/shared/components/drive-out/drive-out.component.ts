import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { DashService } from '../../../dashboard/services/dash.service';
import { DriveOutModel } from '../../../dashboard/models/driveOut.model';
import { BillingModel } from '../../../dashboard/models/billing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drive-out',
  templateUrl: './drive-out.component.html',
  styleUrls: ['./drive-out.component.scss'],
})
export class DriveOutComponent implements OnInit {
  @ViewChild('radioInput') 'radioInput': ElementRef;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  stepFour: boolean = false;
  stepFive: boolean = false;
  driveOutDetails!: BillingModel;

  submittingPlate: boolean = false;
  numberPlateForm = this.formBuilder.group({
    license_plate: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sharedSrv: SharedService,
    private dashSrv: DashService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleSubmitPlate(): void {
    if (!this.numberPlateForm.valid) {
      this.sharedSrv.showNotification(
        'Please enter a valid number plate',
        'error'
      );
      return;
    }
    this.submittingPlate = true;
    this.dashSrv.createDriveOut(this.numberPlateForm.value).subscribe({
      next: (response) => {
        this.submittingPlate = false;
        this.stepOne = false;
        this.stepTwo = true;
        this.getDriveOutBill(response.id);
      },
      error: (error: { message: string; status: number }) => {
        this.submittingPlate = false;
        if (error.status === 405) {
          this.sharedSrv.showNotification(
            'There was a server error, please try again.',
            'error'
          );
        } else if (error.status === 400) {
          this.sharedSrv.showNotification(error.message, 'error');
        } else {
          this.sharedSrv.showNotification(
            'Unknown error, please try again.',
            'error'
          );
        }
        console.log('Failed drive out ===>>>', error);
      },
    });
  }

  getDriveOutBill(driveOutId: string): void {
    this.dashSrv.getBillings().subscribe({
      next: (response) => {
        console.log('Billing response ==>>', response);
        const driveOut = response.results.find(
          (driveOuts) => driveOuts.drive_out === driveOutId
        );
        console.log('Drive out details ==>>', driveOut);
        if (driveOut) {
          this.router.navigate([`checkout/${driveOut.drive_out}`]);
        } else {
          this.sharedSrv.showNotification('Billing error', 'error');
        }
      },
      error: (err: any) => {
        console.log('Get billing error ==>>', err);
        this.stepTwo = false;
        this.stepOne = true;
      },
    });
  }

  retrievedDriveOutDetails(driveOutId: string): any {
    this.dashSrv.retrieveDriveOut(driveOutId).subscribe({
      next: (response) => {
        this.stepTwo = false;
        this.stepThree = true;
      },
      error: (error: any) => {
        console.log('Failed to retrieve details ===>>', error);
        this.stepTwo = false;
        this.stepOne = true;
      },
    });
  }

  handleCheckRadio(): void {
    const input = this.radioInput.nativeElement;
    input.click();
    console.log(input);
  }
}
