import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CountryDataService } from '../country-data/country-data.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteData: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private countryDataService: CountryDataService
  ) {}

  // Fetches all country data, filters it based on FIFA codes stored in local-storage
  async getAndFilterFavorites(): Promise<any> {
    try {
      // Get all country data
      const allCountries = await this.countryDataService.getAllCountriesData();

      // Get cca2/id data from local storag
      let id = this.localStorageService.getItem('favoriteCountries') || [];

      // Filter the country data by cca2 code
      this.favoriteData = allCountries.filter((country) =>
        id.includes(country.id)
      );

      // Log the filtered data
      console.log('Filtered favorite Data:', this.favoriteData);
      return this.favoriteData;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  }

  // Get favorite countries from local storage
  getFavoriteCountries(): string[] {
    const favorites =
      this.localStorageService.getItem('favoriteCountries') || [];

    return favorites;
  }

  // Add a country to favorites
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
