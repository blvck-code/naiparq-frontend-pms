import { InjectionToken } from '@angular/core';

/**
 * @ignore
 */
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});
