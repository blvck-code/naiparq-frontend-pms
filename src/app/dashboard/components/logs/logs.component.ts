import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { Store } from '@ngrx/store';
import * as driveInActions from '../../state/actions/driveIn.actions';
import { DriveOutModel } from '../../models/driveOut.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  driveOuts$: Observable<DriveOutModel[]> = this.storeSrv.driveOut();
  driveOutLoaded$: Observable<boolean> = this.storeSrv.driveOutLoaded();
  loadNextPage$: Observable<string> = this.storeSrv.driveInNext();

  selectedDriveOut!: DriveOutModel;

  constructor(private storeSrv: StoreService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new driveInActions.LoadDriveIn());
    this.store.dispatch(new driveInActions.LoadDriveOut());
  }
  numSeq(n: number): Array<number> {
    return Array(n);
  }

  selectedLog(driveOut: DriveOutModel): void {
    this.selectedDriveOut = driveOut;
    console.log('Selected drive out ==>', driveOut);
  }
}
