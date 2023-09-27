import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  private countryData: any[] = [];
  private region: string[] = [];

  constructor(private apiService: ApiService) {
    this.getAllCountriesData();
  }

  // Gets all the countries and required data
  private async getAllCountriesData() {
    try {
      const response = await this.apiService.get('all');
      const responseData = response.data;

      // Mapping and sorting (Using cca2 as id)
      this.countryData = responseData
        .map((item: any) => ({
          id: item.cca2,
          name: item.name.common,
          flagUrl: item.flags.svg,
          coatOfArmsUrl: item.coatOfArms.svg,
          region: item.region,
          fifa: item.fifa,
          population: item.population,
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
}
