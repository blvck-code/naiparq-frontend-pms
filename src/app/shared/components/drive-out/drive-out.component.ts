import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { DashService } from '../../../dashboard/services/dash.service';
import { DriveOutModel } from '../../../dashboard/models/driveOut.model';
import { BillingModel } from '../../../dashboard/models/billing.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-drive-out',
  templateUrl: './drive-out.component.html',
  styleUrls: ['./drive-out.component.scss'],
})
export class DriveOutComponent implements OnInit {
  @ViewChild('radioInput') 'radioInput': ElementRef;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  numberPlate: string = '';

  submittingPlate: boolean = false;
  numberPlateForm = this.formBuilder.group({
    license_plate: ['', [Validators.required]],
    space: [''],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sharedSrv: SharedService,
    private dashSrv: DashService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.routerDetails();
  }

  routerDetails(): void {
    const params = this.route.snapshot.queryParams;
    const spaceId = params['id'];

    this.numberPlateForm.patchValue({
      space: spaceId,
    });
  }

  ngOnInit(): void {}

  handleNum(event: any): void {
    this.numberPlate = event.target.value.replace(/\s+/g, '');
    this.numberPlateForm.patchValue({
      license_plate: this.numberPlate.toUpperCase(),
    });
  }

  handleSubmitPlate(): void {
    if (!this.numberPlateForm.valid) {
      this.sharedSrv.showNotification(
        'Please enter a valid number plate',
        'error'
      );
      return;
    }
    this.submittingPlate = true;
    console.log('Form data ==>>', this.numberPlateForm.value);
    this.dashSrv.createDriveOut(this.numberPlateForm.value).subscribe({
      next: (response: DriveOutModel) => {
        this.submittingPlate = false;
        this.stepOne = false;
        this.stepTwo = true;

        if (response.message) {
          this.sharedSrv.showNotification(response.message, 'success');
        }
        console.log('Drive out response ===>>', response);
        this.router.navigate([`bill/${response.id}`]);
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
}
