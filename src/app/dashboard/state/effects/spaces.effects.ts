import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { DashService } from '../../services/dash.service';
import { SharedService } from '../../../shared/services/shared.service';

@Injectable()
export class SpacesEffects {
  constructor(
    private actions$: Actions,
    private dashSrv: DashService,
    private sharedSrv: SharedService
  ) {}

  // Load Spaces
  loadSpaces$: Observable<Action> = createEffect(() => this.actions$.pipe());
}
