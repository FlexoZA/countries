import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//COMPONENTS
import { NavigationComponent } from './navigation/navigation.component';
import { CountriesComponent } from './countries/countries.component';
import { FavoritesComponent } from './favorites/favorites.component';

//SERVICES
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { CountryDataService } from './services/country-data/country-data.service';
import { GetCountryDataService } from './services/country-data/get-country-data.service';

//PIPES
import { NumberFormatPipe } from './pipes/number-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CountriesComponent,
    NumberFormatPipe,
    FavoritesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [LocalStorageService, GetCountryDataService, CountryDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
