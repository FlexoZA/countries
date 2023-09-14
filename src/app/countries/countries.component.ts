import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { LocalStorageService } from '../services/local-storage.service';
import { FavoriteService } from '../services/favorite/favorite.service';

interface CountryData {
  name: string;
  coatOfArmsUrl?: string;
  flagUrl?: string;
  region: string;
  fifa: string;
  population: string;
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
  region: string[] = [];
  selectedRegion: string = 'all';
  filteredCountries: CountryData[] = []; // Property to store filtered countries
  searchTerm: string = ''; // Property to store the search term
  favoriteCountries: string[] = [];

  constructor(
    private countriesService: CountriesService,
    private localStorageService: LocalStorageService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.getCountries().then(() => {
      this.filterCountriesByRegion();
    });
    this.favoriteCountries = this.favoriteService.loadFavoriteCountries();
  }

  // Gets all the countries and required data
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
          coatOfArmsUrl: item.coatOfArms.svg,
          region: item.region,
          fifa: item.fifa,
          population: item.population,
        }))
        .sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        ); // Sort alphabetically

      // Extracts all the regions
      this.region = Array.from(
        new Set(this.countryData.map((country) => country.region))
      ).sort();

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

  // Filter countries by Region
  filterCountriesByRegion() {
    console.log('Debug filterCountriesByRegion', this.countryData);
    this.isLoading = true;
    if (this.selectedRegion === 'all') {
      // Display all countries if "All Regions" is selected
      this.filteredCountries = this.countryData;
      this.isLoading = false;
    } else if (this.selectedRegion) {
      // Filter countries based on the selected region
      this.filteredCountries = this.countryData.filter(
        (country) => country.region === this.selectedRegion
      );
      this.isLoading = false;
    } else {
      // No region selected, display all countries
      this.filteredCountries = this.countryData;
      this.isLoading = false;
    }
  }

  // Filter countries by name or FIFA
  filterCountriesByNameOrFIFA() {
    this.isLoading = true;

    // If no search term provided, display all countries
    if (!this.searchTerm) {
      this.filteredCountries = this.countryData;
      this.isLoading = false;
      return;
    }

    // Normalize search term to lowercase for case-insensitive search
    const searchTermLower = this.searchTerm.toLowerCase();

    // Filter countries based on name or FIFA code
    this.filteredCountries = this.countryData.filter((country) => {
      const countryNameLower = country.name.toLowerCase();
      const fifaLower = country.fifa ? country.fifa.toLowerCase() : '';

      // Check if the country name or FIFA code contains the search term
      return (
        countryNameLower.includes(searchTermLower) ||
        fifaLower.includes(searchTermLower)
      );
    });

    this.isLoading = false;
  }

  // Check if country is a favorite
  isFavorite(countryName: string): boolean {
    let favorites = this.localStorageService.getItem('favoriteCountries') || [];

    return favorites.includes(countryName);
  }

  // Save favorite countries to local storage
  saveFavorite(country: CountryData) {
    console.log('Checking country object:', country);

    const inputCountryName = country.name;

    // Debuging check selected country name
    console.log('selected country', country.name);

    let favorites = this.localStorageService.getItem('favoriteCountries') || [];

    // Check if the country is already in favorites
    if (!favorites.includes(inputCountryName)) {
      // Add the new favorite country to the array
      favorites.push(inputCountryName);
      // Store the entire favorites array in local storage
      this.localStorageService.setItem('favoriteCountries', favorites);
      this.notificationMessage = `${inputCountryName} added to favorites`;
    } else {
      // Remove the country name from favorites
      favorites = favorites.filter((name: string) => name !== inputCountryName);
      // Update local storage with the modified favorites array
      this.localStorageService.setItem('favoriteCountries', favorites);
      this.notificationMessage = `${inputCountryName} removed from favorites`;
    }

    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }
}
