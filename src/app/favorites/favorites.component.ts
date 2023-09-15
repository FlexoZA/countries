import { Component, OnInit } from '@angular/core';
import { CountryDataService } from '../services/country-data/country-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  countryData: any[] = [];

  constructor(private countryDataService: CountryDataService) {}

  ngOnInit(): void {
    this.countryData = this.countryDataService.getCountry();
  }

  getCountriesFromCountryData() {
    // Extract only the names
    const countryNames = this.countryData.map((country) => country.name);
    console.log(countryNames);
  }
}
