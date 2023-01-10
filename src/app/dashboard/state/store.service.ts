import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getSpaces,
  spacesLoaded,
  spacesLoading,
} from './entities/spaces.entities';
import { SpaceModel } from '../models/spaces.model';

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
}
