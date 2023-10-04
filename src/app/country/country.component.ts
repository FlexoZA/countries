import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryDataService } from '../services/country-data/country-data.service';

interface CountryData {
  id: string;
  name: string;
  population: number;
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
    });
  }

  async getCountry() {
    if (this.id) {
      this.country = await this.countryDataService.getCountry(this.id);
    }
    this.isLoading = false;
  }
}
