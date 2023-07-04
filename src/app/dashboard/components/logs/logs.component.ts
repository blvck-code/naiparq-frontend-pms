import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { Store } from '@ngrx/store';
import * as driveInActions from '../../state/actions/driveIn.actions';
import { DriveOutModel } from '../../models/driveOut.model';
import { DashService } from '../../services/dash.service';
import { BehaviorSubject } from 'rxjs';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';

@Component({
  selector: 'naiparq-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  @ViewChild(DaterangepickerDirective, { static: false })
  'pickerDirective': DaterangepickerDirective;

  driveOuts$: Observable<DriveOutModel[]> = this.storeSrv.driveOut();
  driveOutLoaded$: Observable<boolean> = this.storeSrv.driveOutLoaded();
  loadNextPage$: Observable<string> = this.storeSrv.driveInNext();

  currentImg: any;
  slideIndex: number = 0;
  images: any[] = [];

  selectedDriveOut = {
    id: '',
    exit_screenshot: '',
    check_out_time: '',
    drive_in: '',
    drive_in_details: {
      id: '',
      license_plate: '',
      check_in_time: '',
      space: '',
      entry_screenshot: '',
      create_at: '',
      space_details: {
        address: '',
        id: '',
        title: '',
        type: '',
      },
    },
    metadata: {
      message: '',
      space_name: '',
      driver_phone_number: '',
      latest_checkout_time: '',
    },
    created_at: '',
    message: '',
  };
  selectedDriveOutSubject = new BehaviorSubject(this.selectedDriveOut);
  selectedDriveOutObservable = this.selectedDriveOutSubject.asObservable();

  constructor(
    private storeSrv: StoreService,
    private dashSrv: DashService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new driveInActions.LoadDriveIn());
    this.store.dispatch(new driveInActions.LoadDriveOut());
    // this.combinedDriveOut();
  }
  numSeq(n: number): Array<number> {
    return Array(n);
  }

  openDatepicker(): void {
    this.pickerDirective.open();
  }

  changeSlider(n: number): void {
    if (this.images.length !== 2) {
      return;
    }

    if (this.slideIndex === 1) {
      this.slideIndex = 0;
      return;
    }
    if (this.slideIndex === 0) {
      this.slideIndex = 1;
      return;
    }
    this.slideIndex += n;
  }

  todayDate(): Date {
    return this.dashSrv.currentDate;
  }

  combinedDriveOut(): void {
    forkJoin([
      this.dashSrv.loadDriveOut(),
      this.dashSrv.loadGuestDriveOut(),
    ]).subscribe({
      next: ([resp1, resp2]) => {
        const combinedRes = [...resp1.results, ...resp2.results];
        console.log('Resp 1 ==>>', resp1.results);
        console.log('Resp 2 ==>>', resp2.results);
        console.log('Combined content ==>>', combinedRes);
        // this.store.dispatch(
        //   new driveInActions.LoadDriveOutSuccess(combinedRes)
        // );
      },
    });
  }

  selectedLog(driveOut: any): void {
    this.selectedDriveOut = driveOut;
    this.images = [
      driveOut.drive_in_details.entry_screenshot,
      driveOut.exit_screenshot,
    ];
  }
}
