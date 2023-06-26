import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private toast: HotToastService) {}

  showNotification(message: string, type?: string): void {
    if (type === 'success') {
      this.toast.success(message, {
        duration: 3000,
      });
    } else if (type === 'warning') {
      this.toast.warning(message, {
        duration: 3000,
      });
    } else if (type === 'error') {
      this.toast.error(message, {
        duration: 3000,
      });
    } else if (type === 'loading') {
      this.toast.loading(message, {
        duration: 3000,
      });
    } else if (type === 'info') {
      this.toast.info(message, {
        duration: 3000,
      });
    } else {
      this.toast.show(message, {
        duration: 3000,
      });
    }
  }
}
