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
  isLoading: boolean = false;
  countryId: string[] = [];
  notificationVisible: boolean = false;
  notificationMessage: string = '';
  isRemoveModalOpen: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;
  favoriteToRemove: string = ''; // Used in Dialog
  favoriteName: string = ''; // Used in Dialog

  constructor(
    private localStorageService: LocalStorageService,
    private countryDataService: CountryDataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  // Update your getCountries method
  async getCountries() {
    this.countryData = await this.countryDataService.getCountries();
    this.totalItems = this.countryData.length;
  }

  // Calculate the total number of pages in a getter property
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Disable logic for Previous and Next buttons
  isPreviousButtonDisabled(): boolean {
    return this.currentPage === 1;
  }

  isNextButtonDisabled(): boolean {
    return this.currentPage === this.totalPages;
  }

  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
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

  removeFromFavorites(countryId: any): void {
    this.localStorageService.removeFromFavorites(
      'favoriteCountries',
      countryId
    );
    // notificationn
    console.log('DEBUG:: RemoveFavorite', countryId);
    this.notificationService.displayNotification(
      'Removed ' + countryId + ' from favorites'
    );
  }

  openModal(countryId: string, countryName: string): void {
    console.log('DEBUG::');
    this.favoriteToRemove = countryId;
    this.favoriteName = countryName;
    this.isRemoveModalOpen = true;
  }

  closeModal() {
    console.log('DEBUG:: Close Modal');
    this.isRemoveModalOpen = false;
  }
}
