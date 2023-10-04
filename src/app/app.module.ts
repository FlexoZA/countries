import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//COMPONENTS
import { NavigationComponent } from './navigation/navigation.component';
import { CountriesComponent } from './countries/countries.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoriteBarComponent } from './favorites/favorite-bar/favorite-bar.component';
import { SearchComponent } from './search/search.component';

//SERVICES
import { ApiService } from './api.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { CountryDataService } from './services/country-data/country-data.service';

//PIPES
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { NotificationsComponent } from './notifications/notifications.component';
import { CountryComponent } from './country/country.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CountriesComponent,
    NumberFormatPipe,
    FavoritesComponent,
    FavoriteBarComponent,
    SearchComponent,
    NotificationsComponent,
    CountryComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [LocalStorageService, ApiService, CountryDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
