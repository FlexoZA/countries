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
  isLoading: boolean = true;
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

  async getCountries() {
    this.countryData = await this.countryDataService.getCountries();
    this.totalItems = this.countryData.length;
    this.isLoading = false;
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

  displayPageNumber(page: number): boolean {
    const firstTwoPages = page <= 2;
    const lastTwoPages = page > this.totalPages - 2;
    const centerPages =
      page >= this.currentPage - 2 && page <= this.currentPage + 2;

    return firstTwoPages || lastTwoPages || centerPages;
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
      countryName + ' added To favorites'
    );
  }

  removeFromFavorites(countryId: any, countryName: string): void {
    this.localStorageService.removeFromFavorites(
      'favoriteCountries',
      countryId
    );
    this.isRemoveModalOpen = false;
    // notificationn
    this.notificationService.displayNotification(
      countryName + ' removed from favorites'
    );
  }

  openModal(countryId: string, countryName: string): void {
    this.favoriteToRemove = countryId;
    this.favoriteName = countryName;
    this.isRemoveModalOpen = true;
  }

  closeModal() {
    this.isRemoveModalOpen = false;
  }
}
