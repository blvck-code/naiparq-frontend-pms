import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriveInResponseModel } from '../models/driveIn.model';
import { SpaceModelResponse } from '../models/spaces.model';
import { DriveOutModel, DriveOutResponseModel } from '../models/driveOut.model';
import { BillingModel, BillingResponseModel } from '../models/billing.model';
import { DevicesResponseModel } from '../models/devices.model';
import { PricingModel } from '../models/pricing.model';
import { PriceScheduleModel } from '../models/priceSchedule.model';
import {
  OrganisationModel,
  OrganisationResponseModel,
} from '../models/organisation.model';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  constructor(private http: HttpClient) {}
  timeIntervals = [
    {
      key: '0 mins',
      value: 0,
    },
    {
      key: '30 mins',
      value: 0.5,
    },
    {
      key: '1 hr',
      value: 1,
    },
    {
      key: '1hr 30 mins',
      value: 1.5,
    },
    {
      key: '2hr',
      value: 2,
    },
    {
      key: '2hr 30 mins',
      value: 2.5,
    },
    {
      key: '3hr',
      value: 3,
    },
    {
      key: '3hr 30 mins',
      value: 3.5,
    },
    {
      key: '4hr',
      value: 4,
    },
    {
      key: '4hr 30 mins',
      value: 4.5,
    },
  ];
  spaceFeatures = [
    {
      key: '24 Hour Surveillance',
      value: '24hr_surveillance',
    },
    {
      key: 'On Street',
      value: 'on_street',
    },
    {
      key: 'Off Street',
      value: 'off_street',
    },
    {
      key: 'CCTV',
      value: 'cctv',
    },
    {
      key: 'Disabled',
      value: 'disabled',
    },
    {
      key: 'Driveway',
      value: 'driveway',
    },
    {
      key: 'Gate',
      value: 'gate',
    },
    {
      key: 'Field',
      value: 'field',
    },
    {
      key: 'Yard',
      value: 'yard',
    },
  ];

  // Space Drive In
  getDriveIn(): Observable<DriveInResponseModel> {
    return this.http.get<DriveInResponseModel>(env.naiparqDriveIn);
  }
  loadMoreDriveIn(nextPageURL: string): Observable<DriveInResponseModel> {
    return this.http.get<DriveInResponseModel>(nextPageURL);
  }
  createDriveIn(driveInContent: any): Observable<any> {
    return this.http.post(`${env.naiparqDriveIn}/`, driveInContent);
  }

  // Space Drive Out
  createDriveOut(payload: {
    license_plate: string;
  }): Observable<DriveOutModel> {
    return this.http.post<DriveOutModel>(`${env.naiparqDriveOut}/`, payload);
  }
  loadDriveOut(): Observable<DriveOutResponseModel> {
    return this.http.get<DriveOutResponseModel>(env.naiparqDriveOut);
  }
  retrieveDriveOut(driveOutId: string): Observable<DriveOutModel> {
    return this.http.get<DriveOutModel>(`${env.naiparqDriveOut}/${driveOutId}`);
  }

  // Spaces
  createSpace(spacePayload: any): Observable<any> {
    return this.http.post(env.naiparqCreateSpace, spacePayload);
  }
  loadSpaces(): Observable<SpaceModelResponse> {
    return this.http.get<SpaceModelResponse>(env.naiparqListSpaces);
  }
  createSpaceGallery(content: any): Observable<{ space: string }> {
    return this.http.post<{ space: string }>(env.naiparqGallery, content);
  }

  paymentDriveOut(payload: {
    payment_channel: string;
    phone_number: string;
    billId: string;
  }): Observable<any> {
    const content = {
      payment_channel: payload.payment_channel,
      phone_number: payload.phone_number,
    };
    console.log('Payload ==>>', content);
    return this.http.put(env.naiparqCheckout + `/${payload.billId}/`, content);
  }

  // Devices/Assets
  loadDevices(): Observable<DevicesResponseModel> {
    return this.http.get<DevicesResponseModel>(env.naiparqDevicesList);
  }

  // Create pricing schedules
  createPricing(content: {
    min_time: string;
    max_time: string;
    price: string;
  }): Observable<PricingModel> {
    return this.http.post<PricingModel>(env.naiparqCreatePricing, content);
  }
  createPriceSchedule(content: {
    label: string;
    spacePriceGroup: string[];
  }): Observable<PriceScheduleModel> {
    return this.http.post<PriceScheduleModel>(
      env.naiparqCreatePriceSchedule,
      content
    );
  }

  // Create organization
  creatOrganization(content: {
    name: string;
    space: string;
    floor: number;
  }): Observable<OrganisationModel> {
    return this.http.post<OrganisationModel>(env.naiparqCreateOrg, content);
  }
  fetchOrganizations(): Observable<OrganisationResponseModel> {
    return this.http.get<OrganisationResponseModel>(env.naiparqOrgList);
  }

  // Create white list
  createWhiteList(content: any): Observable<any> {
    return this.http.post(env.naiparqCreateWhiteList, content);
  }

  // Billings and Payments
  filterBill(billId: string): Observable<BillingResponseModel> {
    return this.http.get<BillingResponseModel>(
      `${env.naiparqBillingList}/?drive_out=${billId}`
    );
  }

  fetchBillings(): Observable<BillingResponseModel> {
    return this.http.get<BillingResponseModel>(env.naiparqBillingList);
  }
}
