import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryDataService } from '../services/country-data/country-data.service';

interface CountryData {
  id: string;
  name: string;
  population: number;
  fifa: string;
  capital: string[];
  region: string;
  timeZones: string;
  languages: string[];
  currencies: CurrencyData[];
  capitalLatLong: string[];
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
  currentTime: Date = new Date();

  isLoading: boolean = true;
  country: CountryData | null = null;
  id: string | null = null;

  constructor(
    private countryDataService: CountryDataService,
    private route: ActivatedRoute
  ) {
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000); // Update currentTime every minute
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.getCountry();
      }
    });
  }

  async getCountry() {
    if (this.id) {
      this.country = await this.countryDataService.getCountry(this.id);
    }
    this.isLoading = false;
  }

  currentDate() {
    this.currentTime = new Date();
  }
}
