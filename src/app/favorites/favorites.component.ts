import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite/favorite.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteData: any[] = [];
  selectedFavoriteId: string[] = [];
  isModalOpen = false;

  constructor(
    private favoriteService: FavoriteService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadFavoriteData();
  }

  async loadFavoriteData() {
    this.favoriteData = await this.favoriteService.getAndFilterFavorites();
  }

  removeFavorite(id: string) {
    this.localStorageService.removeFromFavorites('favoriteCountries', id);
    this.removeFavoriteFromData(id);
    this.isModalOpen = false;
    // notificationn
    this.notificationService.displayNotification(
      'Removed selected from favorites'
    );
  }

  removeFavoriteFromData(id: string) {
    const index = this.favoriteData.findIndex((favorite) => favorite.id === id);
    if (index !== -1) {
      this.favoriteData.splice(index, 1);
    }
  }

  removeSelectedFavorites() {
    for (const id of this.selectedFavoriteId) {
      this.removeFavorite(id);
      this.removeFavoriteFromData(id);
    }
    // Reset the selectedfavoriteid array
    this.selectedFavoriteId = [];
  }

  // checkbox's state changes.
  onSelectfavorites(event: any, countryId: string) {
    // Check if the checkbox is checked
    if (event.target.checked) {
      // If the checkbox is checked, add the 'countryId' to the selectedCountryIds array.
      this.selectedFavoriteId.push(countryId);
    } else {
      // If the checkbox is unchecked (deselected), find the index of 'countryId' in the selectedCountryIds array.
      const index = this.selectedFavoriteId.indexOf(countryId);

      // Check if the 'countryId' was found in the array (index is greater than -1).
      if (index > -1) {
        // If found, remove it from the selectedCountryIds array using splice.
        this.selectedFavoriteId.splice(index, 1);
      }
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
