import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';

interface Currency {
  name: string;
  symbol: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  private countryData: any[] = [];
  private region: string[] = [];
  private latlng: string[] = [];
  //private currencies: Currency[] | null = null;
  //private timeZone: string[] = [];

  constructor(private apiService: ApiService) {
    this.getAllCountriesData();
  }

  // Gets all the countries
  private async getAllCountriesData() {
    try {
      const response = await this.apiService.get('all');
      const responseData = response.data;

      // Mapping and sorting (Using cca2 as id)
      this.countryData = responseData
        .map((item: any) => ({
          id: item.cca2.toLowerCase(),
          name: item.name.common,
          flagUrl: item.flags.svg,
          coatOfArmsUrl: item.coatOfArms.svg,
          region: item.region,
          fifa: item.fifa,
          population: item.population,
          capital: item.capital,
          timeZones: item.timezones,
          currency: item.currencies,
          languages: item.languages,
          capitalLatLong: item.capitalInfo.latlng,
        }))

        .sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        ); // Sort alphabetically
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Returns alll country data
  async getCountries() {
    await this.getAllCountriesData();
    return this.countryData;
  }

  // Extracts regions
  async getAllregions() {
    await this.getAllCountriesData();
    this.region = Array.from(
      new Set(this.countryData.map((country) => country.region))
    ).sort();
    return this.region;
  }

  // Gets single country based on id
  async getCountry(id: string) {
    await this.getAllCountriesData();
    const country = this.countryData.find((country) => country.id === id);
    if (!country) {
      throw new Error(`Country with id ${id} not found`);
    }
    const languages = Object.values(country.languages);
    const currencies = Object.entries(country.currency).map(
      ([code, currency]) => ({
        code,
        name: (currency as Currency).name,
        symbol: (currency as Currency).symbol,
      })
    );
    return { ...country, languages, currencies };
  }
}
