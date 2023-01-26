import { Component, OnInit } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import * as deviceActions from '../../state/actions/assets.actions';
import { DevicesModel } from '../../models/devices.model';
import { devices, devicesLoaded } from '../../state/entities/devices.entities';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assets-management',
  templateUrl: './assets-management.component.html',
  styleUrls: ['./assets-management.component.scss'],
})
export class AssetsManagementComponent implements OnInit {
  constructor(private store: Store) {}
  devices$: Observable<DevicesModel[]> = this.store.select(devices);
  devicesLoaded$: Observable<boolean> = this.store.select(devicesLoaded);

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices(): void {
    this.store.dispatch(new deviceActions.LoadDevices());
  }
  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
