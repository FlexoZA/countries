import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteData: any[] = [];
  noFavoritesMessage = 'This will load the add multiple component';

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.loadFavoriteData();
  }

  async loadFavoriteData() {
    try {
      this.favoriteData = await this.favoriteService.getAndFilterFavorites();
    } catch (error) {
      console.error('Could not load favorite data:', error);
    }
  }
}
