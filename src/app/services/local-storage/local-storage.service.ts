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
  setItem(key: string, id: any): void {
    const existingData = this.getItem(key) || [];
    if (!existingData.includes(id)) {
      const updatedData = [...existingData, id];
      localStorage.setItem(key, JSON.stringify(updatedData));
    }
  }

  // Set array data in local storage
  addTofavorites(key: string, newData: any): void {
    const existingData = this.getItem(key) || [];
    if (!existingData.includes(newData)) {
      const updatedData = [...existingData, ...newData];
      localStorage.setItem(key, JSON.stringify(updatedData));
    }
  }

  isInFavorites(key: string, id: any): boolean {
    const existingData = this.getItem(key) || [];
    return existingData.includes(id);
  }

  // Remove data from local storage
  // PLACHOLDER
  removeItem(key: string, index: number): void {
    const existingData = this.getItem(key) || [];
    if (index >= 0 && index < existingData.length) {
      existingData.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(existingData));
    }
  }

  removeFromFavorites(key: string, id: any): void {
    const existingData = this.getItem(key) || [];
    const index = existingData.indexOf(id);
    if (index !== -1) {
      existingData.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(existingData));
    }
  }
}
