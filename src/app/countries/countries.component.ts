import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';

interface CountryData {
  name: {
    common: string;
  };
  flags?: {
    svg: string;
  };
  flagUrl?: string;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countryData: CountryData[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    try {
      const response = await this.countriesService.get('all');
      const responseData = response.data;

      // Filter and validate the data before mapping
      this.countryData = responseData
        .filter(
          (item: any) =>
            item.name && item.name.common && item.flags && item.flags.svg
        )
        .map((item: any) => ({
          name: item.name.common,
          flagUrl: item.flags.svg,
        }))
        .sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        ); // Sort alphabetically

      console.log(this.countryData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
