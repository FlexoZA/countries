import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite/favorite.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-bar',
  templateUrl: './favorite-bar.component.html',
  styleUrls: ['./favorite-bar.component.css'],
})
export class FavoriteBarComponent implements OnInit {
  favorites: any[] = [];
  subscription!: Subscription;

  constructor(
    private favoriteService: FavoriteService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.subscription = this.localStorageService.favoriteCountries$.subscribe(
      () => {
        this.getFavorites();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getFavorites() {
    this.favorites = await this.favoriteService.getFavoriteCountries();
  }
}
