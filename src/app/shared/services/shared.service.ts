import { Injectable } from '@angular/core';
import {HotToastService} from "@ngneat/hot-toast";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private toast: HotToastService
  ) { }

  showNotification(message: string, type?: string): void {
    if (type === 'success') {
      this.toast.success(message);
    } else if (type === 'warning') {
      this.toast.warning(message);
    } else if (type === 'error') {
      this.toast.error(message);
    } else if (type === 'loading') {
      this.toast.loading(message)
    } else if(type === 'info') {
      this.toast.info(message)
    } else {
      this.toast.show(message)
    }
  }
}
