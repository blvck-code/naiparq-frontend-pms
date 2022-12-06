import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DashService} from "../../services/dash.service";
import {DriveInModel} from "../../models/driveIn.model";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {SharedService} from "../../../shared/services/shared.service";

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.scss']
})
export class CashPaymentComponent implements OnInit {
  @ViewChild('closeDriveIn') 'closeDriveIn': ElementRef;

  driveIns: DriveInModel[] = [];
  driveInForm = this.formBuilder.group({
    space: ["a386fe43-eb73-4875-808c-72143279c136"],
    license_plate: ['', Validators.required]
  })

  isSubmitting: boolean = false;

  constructor(
    private dashSrv: DashService,
    private sharedSrv: SharedService,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.handleDriveInList();
  }

  onInitHandler(): void {

  }

  handleDriveInList(): void {
    this.dashSrv.getDriveIn().subscribe({
      next: (resp) => {
        this.driveIns = resp.results
      }
    })
  }

  onSubmit(): void {
    this.isSubmitting = true;

    this.dashSrv.createDriveIn(this.driveInForm.value).subscribe({
      next: (resp) => {
        this.isSubmitting = false;
        this.sharedSrv.showNotification('New drive in added successfully', 'success');
        this.driveIns = [resp, ...this.driveIns];
        this.closeDriveIn.nativeElement.click();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.sharedSrv.showNotification('Failed to add new drive, please try again.', 'error');
        this.closeDriveIn.nativeElement.click();
      }
    })
  }

  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
