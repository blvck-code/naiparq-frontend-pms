import { Injectable } from '@angular/core';
import {LoginModel, LoginResponseModel} from "../model/login.model";
import { environment as env } from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../shared/services/storage.service";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/services/shared.service";
import dayjs from 'dayjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private sharedSrv: SharedService
  ) {}

  getHeaders(): any {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storageService.getToken()}`,
      }),
    };
  }

  login(loginData: LoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(env.naiparqLogin, loginData)
  }

  refreshToken(): Observable<any> {
    return this.http.post('', '')
  }

  isLoggedIn(): boolean {
    const expiry = this.storageService.getExpiry();
    if (expiry) {
      return dayjs().isBefore(dayjs(expiry));
    } else {
      return false;
    }
  }
}
