import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { FavoriteService } from '../services/favorite/favorite.service';
import { CountryDataService } from '../services/country-data/country-data.service';

interface CountryData {
  id: string;
  name: string;
  coatOfArmsUrl?: string;
  flagUrl?: string;
  region: string;
  fifa: string;
  population: string;
  isFavorite: boolean;
  //countryData: string;  //TODO:: check if neccassary
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
    private localStorageService: LocalStorageService,
    private favoriteService: FavoriteService,
    private countryDataService: CountryDataService
  ) {}

  ngOnInit() {
    this.getCountries().then(() => {
      this.filterCountriesByRegion();
      this.region = this.countryDataService.getAllregions();
      this.favoriteCountries = this.favoriteService.getFavoriteCountries();
    });
  }

  //Gets all countries and data
  async getCountries() {
    try {
      this.countryData = await this.countryDataService.getAllCountriesData();
    } catch (error) {
      console.error('Could not load favorite data:', error);
    }
  }

  // Filter countries by Region
  // TODO:: Move this to it's own component
  filterCountriesByRegion() {
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
  // TODO:: Move this to it's own component
  filterCountriesByNameOrFIFA() {
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
  }

  // Check if country is a favorite
  // TODO:: Move this to it's own component
  isFavorite(countryId: string) {
    let favorites = this.localStorageService.getItem('favoriteCountries') || [];
    return favorites.includes(countryId);
  }

  // Save favorite countries to local storage
  // TODO:: Move this to it's own component
  saveFavorite(country: CountryData) {
    const inputCountryId = country.id;

    let favorites = this.localStorageService.getItem('favoriteCountries') || [];

    // Check if the country is already in favorites
    if (!favorites.includes(inputCountryId)) {
      // Add the new favorite country to the array
      favorites.push(inputCountryId);
      // Store the entire favorites array in local storage
      this.localStorageService.setItem('favoriteCountries', favorites);
      this.notificationMessage = `${country.name} added to favorites`;
    } else {
      // Remove the country name from favorites
      favorites = favorites.filter((name: string) => name !== inputCountryId);
      // Update local storage with the modified favorites array
      this.localStorageService.setItem('favoriteCountries', favorites);
      this.notificationMessage = `${country.name} removed from favorites`;
    }

    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }
}
