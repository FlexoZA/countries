import { Component } from '@angular/core';
import { CountryDataService } from '../services/country-data/country-data.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { NotificationService } from '../services/notification/notification.service';

interface CountryData {
  region: string;
  fifa: string;
  name: string;
  flagUrl: string;
  population: string;
  id: string;
  modalCountryId: string; // Used in Dialog
  modalCountryName: string; // Used in Dialog
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  countryData: CountryData[] = [];
  selectedRegion: string = 'select';
  filteredCountries: CountryData[] = [];
  region: string[] = [];
  searchTerm: string = '';
  isClosed = false;
  selectedCountryIds: string[] = [];
  isModalOpen = false;
  favoriteToRemove = ''; // Used in Dialog
  favoriteName = ''; // Used in Dialog
  notificationVisible: boolean = false;
  notificationMessage: string = '';

  constructor(
    private countryDataService: CountryDataService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getCountries().then(() => {
      this.getRegions();
      //this.filteredCountries;
    });
  }

  // Gets all countries and data
  async getCountries() {
    this.countryData = await this.countryDataService.getCountries();
  }

  // Gets all main regions
  async getRegions() {
    this.region = await this.countryDataService.getAllregions();
  }

  // Filter countries by Region
  filterCountriesByRegion() {
    if (this.selectedRegion === 'all') {
      this.filteredCountries = this.countryData;
    } else {
      this.filteredCountries = this.countryData.filter(
        (country) => country.region === this.selectedRegion
      );
    }
  }

  // Filter countries by name or FIFA
  filterCountriesByNameOrFIFA() {
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

  // checkbox's state changes.
  onSelectfavorites(event: any, countryId: string) {
    // Check if the checkbox is checked (selected)
    if (event.target.checked) {
      // If the checkbox is checked, add the 'countryId' to the selectedCountryIds array.
      this.selectedCountryIds.push(countryId);
    } else {
      // If the checkbox is unchecked (deselected), find the index of 'countryId' in the selectedCountryIds array.
      const index = this.selectedCountryIds.indexOf(countryId);

      // Check if the 'countryId' was found in the array (index is greater than -1).
      if (index > -1) {
        // If found, remove it from the selectedCountryIds array using splice.
        this.selectedCountryIds.splice(index, 1);
      }
    }
  }

  // Saves favorites
  saveSelectedCountries(): void {
    this.localStorageService.addTofavorites(
      'favoriteCountries',
      this.selectedCountryIds
    );
    // notificationn
    this.notificationService.displayNotification('Added selected to favorites');
  }

  isFavorite(countryId: string): boolean {
    return this.localStorageService.isInFavorites(
      'favoriteCountries',
      countryId
    );
  }

  removeFromFavorites(countryId: string): void {
    this.localStorageService.removeFromFavorites(
      'favoriteCountries',
      countryId
    );
    this.isModalOpen = false;
    // notificationn
    this.notificationService.displayNotification(
      'Removed selected from favorites'
    );
  }

  openModal(countryId: string, countryName: string): void {
    this.favoriteToRemove = countryId;
    this.favoriteName = countryName;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
