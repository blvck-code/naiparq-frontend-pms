import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashService } from '../../services/dash.service';
import { SharedService } from '../../../shared/services/shared.service';

// Actions
import * as dashActions from '../actions/action.types';
import * as spaceActions from '../actions/spaces.actions';
import * as driveInActions from '../actions/driveIn.actions';
import * as devicesActions from '../actions/assets.actions';
import * as billingActions from '../actions/billing.actions';

import { SpaceModelResponse } from '../../models/spaces.model';
import { LoadMoreDriveIn } from '../actions/driveIn.actions';
import { DriveInResponseModel } from '../../models/driveIn.model';
import { DriveOutResponseModel } from '../../models/driveOut.model';
import { LoadDevicesSuccess } from '../actions/assets.actions';
import { DevicesResponseModel } from '../../models/devices.model';
import { BillingResponseModel } from '../../models/billing.model';

@Injectable()
export class SpacesEffects {
  constructor(
    private actions$: Actions,
    private dashSrv: DashService,
    private sharedSrv: SharedService
  ) {}

  // Load Spaces
  loadSpaces$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<spaceActions.LoadSpaces>(dashActions.DashActionTypes.LOAD_SPACES),
      switchMap((action: spaceActions.LoadSpaces) =>
        this.dashSrv.loadSpaces().pipe(
          map(
            (spaces: SpaceModelResponse) =>
              new spaceActions.LoadSpacesSuccess(spaces)
          ),
          // @ts-ignore
          catchError((err: any) => {
            console.log('Getting spaces failed ===>>', err);
            return;
          })
        )
      )
    )
  );

  // Load Organizations
  loadOrganizations$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<spaceActions.LoadOrganizations>(
        dashActions.DashActionTypes.LOAD_ORGANIZATION
      ),
      switchMap((action: spaceActions.LoadOrganizations) =>
        this.dashSrv.fetchOrganizations().pipe(
          map(
            (organizations) =>
              new spaceActions.LoadOrganizationsSuccess(organizations)
          ),
          // @ts-ignore
          catchError((err: any) => {
            console.log('Getting spaces failed ===>>', err);
            return;
          })
        )
      )
    )
  );

  // Load Drive Ins
  loadDriveIn$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<driveInActions.LoadDriveIn>(
        dashActions.DashActionTypes.LOAD_DRIVE_IN
      ),
      switchMap((action: driveInActions.LoadDriveIn) =>
        this.dashSrv.getDriveIn().pipe(
          map((driveIn) => new driveInActions.LoadDriveInSuccess(driveIn)),
          // @ts-ignore
          catchError((err) => {
            // Todo notification of the error
          })
        )
      )
    )
  );

  // Load More Drive In
  loadMoreDriveIn$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<driveInActions.LoadMoreDriveIn>(
        dashActions.DashActionTypes.LOAD_MORE_DRIVE_IN
      ),
      map((action: driveInActions.LoadMoreDriveIn) => action.payload),
      switchMap((nextPageURL) =>
        this.dashSrv.loadMoreDriveIn(nextPageURL).pipe(
          map(
            (moreContent: DriveInResponseModel) =>
              new driveInActions.LoadMoreDriveInSuccess(moreContent)
          ),
          catchError((err: any) =>
            of(new driveInActions.LoadMoreDriveInFail(err))
          )
        )
      )
    )
  );

  // Drive out
  loadDriveOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<driveInActions.LoadDriveOut>(
        dashActions.DashActionTypes.LOAD_DRIVE_OUT
      ),
      switchMap((action: driveInActions.LoadDriveOut) =>
        this.dashSrv.loadDriveOut().pipe(
          map(
            (driveOut: DriveOutResponseModel) =>
              new driveInActions.LoadDriveOutSuccess(driveOut)
          ),
          //@ts-ignore
          catchError((err) => {
            console.log('Getting drive out failed ===>>>', err);
          })
        )
      )
    )
  );

  // Filter Drive Out
  filterDriveOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<driveInActions.filterDriveOut>(
        dashActions.DashActionTypes.FILTER_DRIVE_OUT
      ),
      switchMap((params: any) =>
        this.dashSrv.filterDriveOut(params).pipe(
          map(
            (driveOut: DriveOutResponseModel) =>
              new driveInActions.filterDriveOutSuccess(driveOut)
          ),
          //@ts-ignore
          catchError((err) => {
            console.log('Getting drive out failed ===>>>', err);
          })
        )
      )
    )
  );

  // Billings
  loadBillings$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<billingActions.LoadBillings>(
        dashActions.DashActionTypes.LOAD_BILLINGS
      ),
      map((action: billingActions.LoadBillings) => action.payload),
      switchMap((payload) =>
        this.dashSrv.fetchBillings(payload).pipe(
          map(
            (billings: BillingResponseModel) =>
              new billingActions.LoadBillingsSuccess(billings)
          ),
          //@ts-ignore
          catchError((err) => {
            console.log('Get billings failed ==>>', err);
          })
        )
      )
    )
  );

  // Assets
  loadDevices$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<devicesActions.LoadDevices>(
        dashActions.DashActionTypes.LOAD_DEVICES
      ),
      switchMap((action: devicesActions.LoadDevices) =>
        this.dashSrv.loadDevices().pipe(
          map(
            (devices: DevicesResponseModel) =>
              new devicesActions.LoadDevicesSuccess(devices)
          ),
          //@ts-ignore
          catchError((err) => {
            console.log('Failed getting assets ==>>', err);
          })
        )
      )
    );
  });
}
