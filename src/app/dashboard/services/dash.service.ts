import { Injectable } from '@angular/core';
import { environment as env } from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DriveInResponseModel} from "../models/driveIn.model";

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(
    private http: HttpClient
  ) { }

  // Space Drive In
  getDriveIn(): Observable<DriveInResponseModel> {
    return this.http.get<DriveInResponseModel>(env.naiparqDriveIn)
  }

  createDriveIn(driveInContent: any): Observable<any> {
    return this.http.post(`${env.naiparqDriveIn}/`, driveInContent);
  }

}
