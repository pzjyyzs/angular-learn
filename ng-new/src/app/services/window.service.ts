import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
   }

   alert(msg: string): void {
     if (this.isBrowser) {
       alert(msg);
     }
   }

   setStorage(key: string, value: string): void {
     if (this.isBrowser) {
      localStorage.setItem(key, value);
     }
   }

   getStorage(key: string): string | null {
     if (this.isBrowser) {
       return localStorage.getItem(key);
     }
   }

   removeStorage(key: string): void {
     if (this.isBrowser) {
      localStorage.removeItem(key);
     }
   }

   clearStorage(): void {
     if (this.isBrowser) {
      localStorage.clear();
     }
   }
}
