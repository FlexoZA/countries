import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CountriesComponent } from './countries/countries.component';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [AppComponent, NavigationComponent, CountriesComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
