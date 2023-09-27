import { Component, OnInit } from '@angular/core';
import { CountryDataService } from '../services/country-data/country-data.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { NotificationService } from '../services/notification/notification.service';

interface CountryData {
  id: string;
  name: string;
  coatOfArmsUrl?: string;
  flagUrl?: string;
  region: string;
  fifa: string;
  population: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countryData: CountryData[] = [];
  isLoading: boolean = false; // Initialize isLoading as true
  countryId: string[] = [];
  notificationVisible: boolean = false;
  notificationMessage: string = '';
  isModalOpen = false;

  constructor(
    private localStorageService: LocalStorageService,
    private countryDataService: CountryDataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  //Gets all countries
  async getCountries() {
    this.countryData = await this.countryDataService.getCountries();
  }

  // Check if country is a favorite
  isFavorite(countryId: any): boolean {
    return this.localStorageService.isInFavorites(
      'favoriteCountries',
      countryId
    );
  }

  // Saves favotites
  saveFavorite(countryId: any, countryName: string): void {
    console.log('DEBUG:: SaveFavorite', countryName);
    this.localStorageService.setItem('favoriteCountries', countryId);
    // notificationn
    this.notificationService.displayNotification(
      'Added ' + countryName + ' To favorites'
    );
  }

  removeFromFavorites(countryId: any, countryName: string): void {
    this.localStorageService.removeFromFavorites(
      'favoriteCountries',
      countryId
    );
    // notificationn
    this.notificationService.displayNotification(
      'Removed ' + countryName + ' from favorites'
    );
  }
}
