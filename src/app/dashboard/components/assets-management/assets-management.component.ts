import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import * as deviceActions from '../../state/actions/assets.actions';
import { DevicesModel } from '../../models/devices.model';
import { devices, devicesLoaded } from '../../state/entities/devices.entities';
import { Observable } from 'rxjs';
import { SharedService } from '../../../shared/services/shared.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SpaceModel } from '../../models/spaces.model';
import { StoreService } from '../../state/store.service';
import { DashService } from '../../services/dash.service';
import { selectSpaceEntity } from '../../state/entities/spaces.entities';

@Component({
  selector: 'naiparq-assets-management',
  templateUrl: './assets-management.component.html',
  styleUrls: ['./assets-management.component.scss'],
})
export class AssetsManagementComponent implements OnInit {
  @ViewChild('devicePhoto', { static: true }) 'devicePhoto': ElementRef;
  @ViewChild('closeAddDevice') 'closeAddDevice': ElementRef;
  @ViewChild('closeDeleteAsset') 'closeDeleteAsset': ElementRef;
  @ViewChild('addDeviceBtn') 'addDeviceBtn': ElementRef;

  spaceSearchTerm: string = '';
  selectedAssetType: any;
  submitting: boolean = false;
  formInvalid: boolean = false;
  updateAssetMode: boolean = false;

  deleteAssetContent: any;
  deletingAsset: boolean = false;

  assetTypes: { key: string; value: string }[] = [
    {
      key: 'camera',
      value: 'Camera',
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
  assetPurpose: { key: string; value: string }[] = [
    {
      key: 'overhead',
      value: 'Overhead',
    },
    {
      key: 'entry',
      value: 'Entry',
    },
    {
      key: 'exit',
      value: 'Exit',
    },
  ];

  devices$: Observable<DevicesModel[]> = this.store.select(devices);
  devicesLoaded$: Observable<boolean> = this.store.select(devicesLoaded);
  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();

  constructor(
    private store: Store,
    private sharedSrv: SharedService,
    private dashSrv: DashService,
    private storeSrv: StoreService,
    private fb: UntypedFormBuilder
  ) {}

  assetForm = this.fb.group({
    name: ['', Validators.required],
    space: ['', Validators.required],
    asset_type: ['', Validators.required],
    model: ['', Validators.required],
    ip_address: ['', Validators.required],
    mac_address: ['', Validators.required],
    serial_number: ['', Validators.required],
    sensor_id: ['', Validators.required],
    purpose: ['', Validators.required],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getDevices();
  }

  // Limits only admin to see certains
  adminRights(): boolean {
    return this.dashSrv.adminRights();
  }

  selectAssetType(type: { key: string; value: string }): void {
    this.selectedAssetType = type;
    this.assetForm.patchValue({
      asset_type: type.key,
    });
  }

  handleCreateAsset(): void {
    this.updateAssetMode = false;
    this.assetForm.reset();
  }

  // Todo hit another endpoint when submitted
  updateAsset(asset: DevicesModel): void {
    this.addDeviceBtn.nativeElement.click();
    this.updateAssetMode = true;

    this.assetForm.patchValue({
      name: asset.name,
      space: asset.space,
      asset_type: asset.asset_type,
      model: asset.model,
      ip_address: asset.ip_address,
      mac_address: asset.mac_address,
      serial_number: asset.serial_number,
      sensor_id: asset.sensor_id,
      purpose: asset.purpose,
      status: asset.status,
    });
    console.log('Content ==>>', asset);
  }

  deleteAsset(asset: DevicesModel): void {
    this.deleteAssetContent = asset;
  }

  confirmDelete(): void {
    this.deletingAsset = true;

    this.dashSrv.deleteAsset(this.deleteAssetContent.sensor_id).subscribe({
      next: (resp) => {
        this.sharedSrv.showNotification(resp.message, 'success');
        this.deletingAsset = false;
        this.closeDeleteAsset.nativeElement.click();
        // Todo remove from store
        console.log(resp);
      },
      error: (err) => {
        console.log('Failed to delete ==>>', err);
        this.deletingAsset = false;
      },
    });
  }

  // Todo View particular asset info
  viewAsset(asset: DevicesModel): void {
    console.log('Content ==>>', asset);
  }

  onSubmit(): void {
    this.submitting = true;
    this.formInvalid = false;

    if (this.updateAssetMode) {
    } else {
      this.dashSrv.createAsset(this.assetForm.value).subscribe({
        next: (resp: DevicesModel) => {
          this.submitting = false;
          this.sharedSrv.showNotification(
            'Asset device added successfully!',
            'success'
          );
          this.store.dispatch(new deviceActions.AddAsset(resp));
          this.closeAddDevice.nativeElement.click();
          this.assetForm.reset();
        },
        error: (err) => {
          this.submitting = false;
          this.sharedSrv.showNotification(err.message, 'error');
          this.formInvalid = true;
          console.log('Failed create asset ==>>', err);
        },
      });
    }
  }

  getsSpaceName(spaceId: string): string {
    let spaceName: string | undefined = '';
    this.store.select(selectSpaceEntity(spaceId)).subscribe({
      next: (resp) => {
        spaceName = resp?.title;
      },
    });

    return spaceName;
  }

  getDevices(): void {
    this.store.dispatch(new deviceActions.LoadDevices());
  }
  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
