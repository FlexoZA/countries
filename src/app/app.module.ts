import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CountriesComponent } from './countries/countries.component';
import { LocalStorageService } from './services/local-storage.service';
import { NumberFormatPipe } from './pipes/number-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CountriesComponent,
    NumberFormatPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
