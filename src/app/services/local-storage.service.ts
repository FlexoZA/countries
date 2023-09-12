import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Get data from local storage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Set data in local storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove data from local storage
  removeItem(key: string, index: number): void {
    const existingData = this.getItem(key) || [];
    if (index >= 0 && index < existingData.length) {
      existingData.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(existingData));
    }
  }
}
