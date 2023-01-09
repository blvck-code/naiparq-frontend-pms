import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashService } from '../../services/dash.service';
import { SharedService } from '../../../shared/services/shared.service';

// Actions
import * as spaceActions from '../actions/spaces.actions';
import * as dashActions from '../actions/action.types';
import { SpaceModelResponse } from '../../models/spaces.model';

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
            console.log('Getting spaces failed');
            return;
          })
        )
      )
    )
  );
}
