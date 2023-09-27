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

  // Extracts the name of the favorite counties from API and local-host
  getFavoriteCountryNamesById() {
    return from(
      (async () => {
        try {
          // Get all country data
          const allCountries = await this.countryDataService.getCountries();

          // Get the IDs from local storage
          let favoriteIds =
            this.localStorageService.getItem('favoriteCountries') || [];

          // Filter the country data to include only the favorites
          const favoriteCountries = allCountries.filter((country) =>
            favoriteIds.includes(country.id)
          );

          // Extract the names of the favorite countries
          const favoriteNames = favoriteCountries.map(
            (country) => country.name
          );
          this.favoriteNamesChanged.next(favoriteNames);

          return favoriteNames;
        } catch (error) {
          console.error('Error:', error);
          return [];
        }
      })()
    );
  }

  // Get favorite countries from local storage
  getFavoriteCountries(): string[] {
    const favorites =
      this.localStorageService.getItem('favoriteCountries') || [];

    return favorites;
  }
}
