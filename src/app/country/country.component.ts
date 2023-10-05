import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryDataService } from '../services/country-data/country-data.service';

interface CountryData {
  id: string;
  name: string;
  population: number;
  fifa: string;
  capital: string;
  region: string;
  timeZones: string;
  currencies: string;
  languages: string;
}

interface CurrencyData {
  code: string;
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent {
  isLoading: boolean = true;
  country: CountryData | null = null;
  id: string | null = null;
  currencies: CurrencyData[] | null = null;

  constructor(
    private countryDataService: CountryDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.getCountry();
      }
      this.getCurrencies();
    });
  }

  async getCountry() {
    if (this.id) {
      this.country = await this.countryDataService.getCountry(this.id);
    }
    this.isLoading = false;
  }

  async getCurrencies() {
    if (this.id) {
      this.currencies = await this.countryDataService.getCurrenciesForCountry(
        this.id
      );
    }
    console.log(this.currencies);
  }
}
