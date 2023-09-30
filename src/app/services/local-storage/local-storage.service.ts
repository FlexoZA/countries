import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private favoriteCountriesSubject = new BehaviorSubject(
    this.getItem('favoriteCountries')
  );
  favoriteCountries$ = this.favoriteCountriesSubject.asObservable();

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

    // Update the state of the localStorage
    if (key === 'favoriteCountries') {
      this.favoriteCountriesSubject.next(id);
    }
  }

  // Set array data in local storage
  addTofavorites(key: string, newData: any): void {
    const existingData = this.getItem(key) || [];
    if (!existingData.includes(newData)) {
      const updatedData = [...existingData, ...newData];
      localStorage.setItem(key, JSON.stringify(updatedData));
    }

    // Update the state of the localStorage
    if (key === 'favoriteCountries') {
      this.favoriteCountriesSubject.next(newData);
    }
  }

  isInFavorites(key: string, id: any): boolean {
    const existingData = this.getItem(key) || [];
    return existingData.includes(id);
  }

  removeFromFavorites(key: string, id: any): void {
    const existingData = this.getItem(key) || [];
    const index = existingData.indexOf(id);
    if (index !== -1) {
      existingData.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(existingData));
    }

    // Update the state of the localStorage
    if (key === 'favoriteCountries') {
      this.favoriteCountriesSubject.next(id);
    }
  }
}
