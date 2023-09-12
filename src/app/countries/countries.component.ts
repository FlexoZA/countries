import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { LocalStorageService } from '../services/local-storage.service';

interface CountryData {
  name: string;
  flags?: {
    svg: string;
  };
  flagUrl?: string;
  region: string;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countryData: CountryData[] = [];
  isLoading: boolean = true; // Initialize isLoading as true
  notificationMessage: string | null = null; // Notification message

  constructor(
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    try {
      console.log('Loading started');
      const response = await this.countriesService.get('all');
      const responseData = response.data;

      // Mapping and sorting
      this.countryData = responseData
        .map((item: any) => ({
          name: item.name.common,
          flagUrl: item.flags.svg,
          region: item.region,
        }))
        .sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        ); // Sort alphabetically

      // Debugging: Log the populated countryData array.
      console.log('countryData:', this.countryData);

      // Set isLoading to false when loading is complete
      this.isLoading = false;
      console.log('Loading completed');
    } catch (error) {
      console.error('Error:', error);
      // Ensure isLoading is set to false even in case of an error
      this.isLoading = false;
    }
  }

  // Check if country is a favourite
  isFavourite(countryName: string): boolean {
    let favorites =
      this.localStorageService.getItem('favouriteCountries') || [];

    return favorites.includes(countryName);
  }

  // Save favourite countries to local storage
  saveFavourite(country: CountryData) {
    console.log('Checking country object:', country);

    const inputCountryName = country.name;

    // Debuging check selected country name
    console.log('selected country', country.name);

    let favorites =
      this.localStorageService.getItem('favouriteCountries') || [];

    // Check if the country is already in favorites
    if (!favorites.includes(inputCountryName)) {
      // Add the new favourite country to the array
      favorites.push(inputCountryName);
      // Store the entire favourites array in local storage
      this.localStorageService.setItem('favouriteCountries', favorites);
      this.notificationMessage = `${inputCountryName} added to favourites`;
    } else {
      // Remove the country name from favorites
      favorites = favorites.filter((name: string) => name !== inputCountryName);
      // Update local storage with the modified favorites array
      this.localStorageService.setItem('favouriteCountries', favorites);
      this.notificationMessage = `${inputCountryName} removed from favourites`;
    }

    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }
}
