import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import * as deviceActions from '../../state/actions/assets.actions';
import { DevicesModel } from '../../models/devices.model';
import { devices, devicesLoaded } from '../../state/entities/devices.entities';
import { Observable } from 'rxjs';
import { SharedService } from '../../../shared/services/shared.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assets-management',
  templateUrl: './assets-management.component.html',
  styleUrls: ['./assets-management.component.scss'],
})
export class AssetsManagementComponent implements OnInit {
  constructor(
    private store: Store,
    private sharedSrv: SharedService,
    private fb: UntypedFormBuilder
  ) {}
  selectedAssetType: any;

  assetTypes: { key: string; value: string }[] = [
    {
      key: 'cctv',
      value: 'CCTV',
    },
    {
      key: 'boom_barrier',
      value: 'Boom-barrier',
    },
    {
      key: 'geomagnetic',
      value: 'Geomagnetic',
    },
    {
      key: 'ultrasonic',
      value: 'Ultrasonic',
    },
  ];

  assetStatus: { key: string; value: string }[] = [
    {
      key: 'idle',
      value: 'Idle',
    },
    {
      key: 'online',
      value: 'Online',
    },
    {
      key: 'offline',
      value: 'Offline',
    },
    {
      key: 'active',
      value: 'Active',
    },
    {
      key: 'inactive',
      value: 'Inactive',
    },
  ];

  @ViewChild('devicePhoto', { static: true }) 'devicePhoto': ElementRef;
  devices$: Observable<DevicesModel[]> = this.store.select(devices);
  devicesLoaded$: Observable<boolean> = this.store.select(devicesLoaded);

  assetForm = this.fb.group({
    name: ['', Validators.required],
    asset_type: ['', Validators.required],
    model: ['', Validators.required],
    id_address: ['', Validators.required],
    mac_address: ['', Validators.required],
    serial_number: ['', Validators.required],
    purpose: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getDevices();
  }

  selectAssetType(type: { key: string; value: string }): void {
    this.selectedAssetType = type;
    this.assetForm.patchValue({
      asset_type: type.key,
    });
  }

  onSubmit(): void {
    console.log('Form values ===>>', this.assetForm.value);
  }

  getDevices(): void {
    this.store.dispatch(new deviceActions.LoadDevices());
  }
  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
