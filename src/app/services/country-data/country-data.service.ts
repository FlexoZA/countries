import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  private countryData: any[] = [];
  private region: string[] = [];

  constructor(private apiService: ApiService) {}

  // Gets all the countries and required data
  async getAllCountriesData() {
    try {
      console.log('Loading started');
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

      // Set isLoading to false when loading is complete
      console.log('Loading completed');

      return this.countryData;
    } catch (error) {
      console.error('Error:', error);
      // Ensure isLoading is set to false even in case of an error
      return [];
    }
  }

  // Returns alll country data
  getCountries() {
    return this.countryData;
  }

  // Extracts regions
  getAllregions() {
    this.region = Array.from(
      new Set(this.countryData.map((country) => country.region))
    ).sort();

    return this.region;
  }
}
