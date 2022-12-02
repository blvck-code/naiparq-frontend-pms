import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
// import {UserModel} from "../../auth/models/userInfo.model";

interface jwtToken {
  access: string;
  expiry_time: string;
  lifetime: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}

  setToken(token: jwtToken): void {
    this.storage.setItem('ap', token.access);
    this.storage.setItem('rp', token.refresh);
    this.storage.setItem('ep', token.expiry_time);
    this.storage.setItem('lt', token.lifetime);
  }
  setUser(user: any): void {
    this.storage.setItem('fName', user.first_name);
    this.storage.setItem('lName', user.last_name);
    this.storage.setItem('id', user.id);
    this.storage.setItem('email', user.email);
    this.storage.setItem('phoneNum', user.phone_number);
  }
  getExpiry(): any {
    return this.storage.getItem('ep');
  }
  getRefreshToken(): any {
    return this.storage.getItem('rp');
  }
  clearToken(): void {
    this.storage.removeItem('ap');
    this.storage.removeItem('rp');
    this.storage.removeItem('ep');
    this.storage.removeItem('userCenter');
    localStorage.clear();
  }
  getToken(): any {
    return this.storage.getItem('ap');
  }
}
