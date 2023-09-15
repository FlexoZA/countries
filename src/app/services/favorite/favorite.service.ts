import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private localStorageService: LocalStorageService) {}

  // Function to load favorite countries from local storage
  getFavoriteCountries(): string[] {
    // Retrieve favorite countries from local storage
    const favorites =
      this.localStorageService.getItem('favoriteCountries') || [];

    return favorites;
  }

  // Function to add a country to favorites
  addToFavorites(countryName: string): void {
    let favorites = this.getFavoriteCountries();

    // Check if the country is already in favorites
    if (!favorites.includes(countryName)) {
      // Add the new favorite country to the array
      favorites.push(countryName);

      // Store the entire favorites array in local storage
      this.localStorageService.setItem('favoriteCountries', favorites);
    }
  }

  // Function to remove a country from favorites
  removeFromFavorites(countryName: string): void {
    let favorites = this.getFavoriteCountries();

    // Check if the country is in favorites
    if (favorites.includes(countryName)) {
      // Remove the country from the favorites array
      favorites = favorites.filter((name) => name !== countryName);

      // Update the local storage with the modified favorites array
      this.localStorageService.setItem('favoriteCountries', favorites);
    }
  }
}
