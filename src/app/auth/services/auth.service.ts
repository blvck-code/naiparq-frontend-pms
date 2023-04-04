import { Injectable } from '@angular/core';
import { LoginModel, LoginResponseModel } from '../model/login.model';
import { environment as env } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import dayjs from 'dayjs';
import { RegisterModel, RegisterResponseModel } from '../model/register.model';
import { ProfileResponseModel } from '../model/profile.model';
import { AllUsersModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getHeaders(): any {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storageService.getToken()}`,
      }),
    };
  }

  allUsers(): Observable<AllUsersModel> {
    return this.http.get<AllUsersModel>(env.naiparqUsers);
  }

  logIn(loginData: LoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(env.naiparqLogin, loginData);
  }

  logOut(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(env.naiparqLogout);
  }

  register(registerData: RegisterModel): Observable<RegisterResponseModel> {
    return this.http.post<RegisterResponseModel>(
      env.naiparqRegister,
      registerData
    );
  }

  resetPass(phoneNum: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(env.naiparqResetPass, phoneNum);
  }

  refreshToken(refreshToken: string): Observable<any> {
    console.log('Refresh topic ==>>', refreshToken);
    return this.http.post('', '');
  }

  isLoggedIn(): boolean {
    const expiry = this.storageService.getExpiry();
    if (expiry) {
      return dayjs().isBefore(dayjs(expiry));
    } else {
      return false;
    }
  }

  // Profile
  loadProfile(): Observable<ProfileResponseModel> {
    return this.http.get<ProfileResponseModel>(env.naiparqProfile);
  }
}
