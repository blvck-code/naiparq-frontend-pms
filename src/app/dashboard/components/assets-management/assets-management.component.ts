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
  @ViewChild('devicePhoto', { static: true }) 'devicePhoto': ElementRef;
  devices$: Observable<DevicesModel[]> = this.store.select(devices);
  devicesLoaded$: Observable<boolean> = this.store.select(devicesLoaded);

  deviceImg: string = '';
  imgTypes = ['jpg', 'png', 'jpeg'];

  addDeviceForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices(): void {
    this.store.dispatch(new deviceActions.LoadDevices());
  }
  numSeq(n: number): Array<number> {
    return Array(n);
  }

  uploadProfilePic(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const formData = new FormData();

      const fileName = event.target.files[0].name;
      const fileExt = fileName.split('.').pop();
      const fileSize = event.target.files[0].size / 1024 / 1024; // Size in mb

      // Validate file type
      if (!this.imgTypes.includes(fileExt)) {
        this.sharedSrv.showNotification(
          'This file type is not supported.',
          'warning'
        );
        return;
      }

      // Validate file size
      if (fileSize > 5) {
        this.sharedSrv.showNotification(
          'Image size must be under 5MiB!',
          'warning'
        );
        return;
      }

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // @ts-ignore
        this.deviceImg = event.target.result;
      };
      formData.append('image', event);

      // this.useInfoFormData.append('profile_photo', event.target.files[0]);
    } else {
      this.sharedSrv.showNotification(
        'Could not upload your profile photo, please try again.',
        'warning'
      );
    }
  }

  clickEditIcon(): void {
    this.devicePhoto.nativeElement.click();
  }
}
