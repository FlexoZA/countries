import { Injectable } from '@angular/core';
import { GetCountryDataService } from './get-country-data.service';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  private countryData: any[] = [];
  private isLoading: boolean = false;

  constructor(private getCountryDataService: GetCountryDataService) {}

  // Gets all the countries and required data
  async getAllCountriesData() {
    try {
      console.log('Loading started');
      const response = await this.getCountryDataService.get('all');
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
      this.isLoading = false;
      console.log('Loading completed');

      return this.countryData;
    } catch (error) {
      console.error('Error:', error);
      // Ensure isLoading is set to false even in case of an error
      this.isLoading = false;
      return [];
    }
  }

  // Checks if data is loading
  isLoadingData(): boolean {
    return this.isLoading;
  }
}
