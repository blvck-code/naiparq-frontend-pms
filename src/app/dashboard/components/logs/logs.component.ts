import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { Store } from '@ngrx/store';
import * as driveInActions from '../../state/actions/driveIn.actions';
import { DriveOutModel } from '../../models/driveOut.model';
import { DashService } from '../../services/dash.service';

@Component({
  selector: 'naiparq-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  driveOuts$: Observable<DriveOutModel[]> = this.storeSrv.driveOut();
  driveOutLoaded$: Observable<boolean> = this.storeSrv.driveOutLoaded();
  loadNextPage$: Observable<string> = this.storeSrv.driveInNext();

  selectedDriveOut!: DriveOutModel;
  currentImg: any;
  slideIndex: number = 0;
  images: any[] = [];

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

  selectedLog(driveOut: DriveOutModel): void {
    console.log('Selected item ==>>', driveOut);
    this.selectedDriveOut = driveOut;
    this.images = [
      driveOut.drive_in_details.entry_screenshot,
      driveOut.exit_screenshot,
    ];
  }
}
