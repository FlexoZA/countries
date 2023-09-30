import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CountryDataService } from '../country-data/country-data.service';
import { Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteData: any[] = [];
  name: string[] = [];
  favoriteNamesChanged = new Subject<string[]>();

  constructor(
    private localStorageService: LocalStorageService,
    private countryDataService: CountryDataService
  ) {}

  // Fetches all country data, filters it based on id/cca2 codes stored in local-storage
  async getAndFilterFavorites(): Promise<any> {
    try {
      // Get all country data
      const allCountries = await this.countryDataService.getCountries();

      // Get cca2/id data from local storag
      let id = this.localStorageService.getItem('favoriteCountries') || [];

      // Filter the country data by cca2 code
      this.favoriteData = allCountries.filter((country) =>
        id.includes(country.id)
      );

      // Extracts all favorites names
      this.name = Array.from(
        new Set(this.favoriteData.map((country) => country.name))
      ).sort();

      return this.favoriteData;
    } catch (error) {
      console.error('Error:', error);
      return error;
    }
  }

  async getFavoriteCountries() {
    // Gets all countries
    let allCountries = await this.countryDataService.getCountries();
    // Gets all favorites from local storage
    let allFavourites = this.localStorageService.getItem('favoriteCountries');

    let favoriteCountries = allCountries.filter((country) =>
      allFavourites.includes(country.id)
    );

    return favoriteCountries;
  }
}
