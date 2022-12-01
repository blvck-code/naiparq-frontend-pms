import { Injectable } from '@angular/core';
import {LoginModel, LoginResponseModel} from "../model/login.model";
import { environment as env } from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../shared/services/storage.service";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/services/shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private sharedSrv: SharedService
  ) {
    this.sharedSrv.showNotification('Logged out failed, please try again.', 'error')
  }

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

  logout(): void {
    this.http.get(env.naiparqLogout, this.getHeaders()).subscribe({
      next: (res: any) => {
        console.log('Logout response', res);
        this.storageService.clearToken();
        // this.store.dispatch(new authActions.LogOutSuccess(res));
        this.router.navigate(['/auth']);
        this.sharedSrv.showNotification('Logged out successfully.', 'success')
      },
      error: (err: any) => {
        console.log('Error', err);
        this.sharedSrv.showNotification('Logged out failed, please try again.', 'error')
      },
    });
  }
}
