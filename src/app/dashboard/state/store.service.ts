import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getSpaces,
  spacesLoaded,
  spacesLoading,
} from './entities/spaces.entities';
import { SpaceModel } from '../models/spaces.model';
import {
  driveInLoaded,
  driveInNext,
  driveIns,
} from './entities/driveIn.entities';
import { DriveInModel } from '../models/driveIn.model';
import { driveOutLoaded, driveOuts } from './entities/driveOut.entities';
import { DriveOutModel } from '../models/driveOut.model';
import {
  getGuests,
  guestsLoaded,
  guestsLoading,
} from './entities/guests.entities';
import { GuestsModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store) {}

  getSpaces(): Observable<SpaceModel[]> {
    return this.store.pipe(select(getSpaces));
  }
  spacesLoading(): Observable<boolean> {
    return this.store.pipe(select(spacesLoading));
  }
  spacesLoaded(): Observable<boolean> {
    return this.store.pipe(select(spacesLoaded));
  }

  // Drive In
  driveInLoaded(): Observable<boolean> {
    return this.store.pipe(select(driveInLoaded));
  }
  driveIn(): Observable<DriveInModel[]> {
    return this.store.pipe(select(driveIns));
  }
  driveInNext(): Observable<string> {
    return this.store.pipe(select(driveInNext));
  }

  // Drive Out
  driveOutLoaded(): Observable<boolean> {
    return this.store.pipe(select(driveOutLoaded));
  }

  driveOut(): Observable<DriveOutModel[]> {
    return this.store.pipe(select(driveOuts));
  }

  // Guests
  guestsLoaded(): Observable<boolean> {
    return this.store.pipe(select(guestsLoaded));
  }
  guestsLoading(): Observable<boolean> {
    return this.store.pipe(select(guestsLoading));
  }
  guests(): Observable<GuestsModel[]> {
    return this.store.pipe(select(getGuests));
  }
}
