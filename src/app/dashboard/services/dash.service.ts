import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriveInResponseModel } from '../models/driveIn.model';
import { SpaceModelResponse } from '../models/spaces.model';
import { DriveOutModel, DriveOutResponseModel } from '../models/driveOut.model';
import { BillingModel, BillingResponseModel } from '../models/billing.model';
import { DevicesResponseModel } from '../models/devices.model';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  constructor(private http: HttpClient) {}

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
  loadSpaces(): Observable<SpaceModelResponse> {
    return this.http.get<SpaceModelResponse>(env.naiparqListSpaces);
  }

  // Billings and Payments
  getBillings(): Observable<BillingResponseModel> {
    return this.http.get<BillingResponseModel>(env.naiparqBillingList);
  }
  filterBill(billId: string): Observable<BillingModel> {
    return this.http.get<BillingModel>(`${env.naiparqBillingList}/${billId}`);
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
}
