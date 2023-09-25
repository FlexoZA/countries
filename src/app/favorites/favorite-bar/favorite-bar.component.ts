import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite/favorite.service';

@Component({
  selector: 'app-favorite-bar',
  templateUrl: './favorite-bar.component.html',
  styleUrls: ['./favorite-bar.component.css'],
})
export class FavoriteBarComponent implements OnInit {
  favoriteNames: string[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteService.favoriteNamesChanged.subscribe((names: string[]) => {
      this.favoriteNames = names;
    });
    this.loadFavoriteNames();
  }

  loadFavoriteNames() {
    this.favoriteService.getFavoriteCountryNamesById().subscribe({
      next: (names) => {
        this.favoriteNames = names;
      },
      error: (error) => {
        console.error('Could not load favorite data:', error);
      },
    });
  }
}
