import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GetCountryDataService } from './get-country-data.service';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  private countryData: any[] = [];
  private region: string[] = [];
  private isLoading: boolean = false;

  constructor(private getCountryDataService: GetCountryDataService) {}

  // Fetches all countries and required data
  getCountriesData(): Observable<void> {
    this.isLoading = true;

    return this.getCountryDataService.get('all').pipe(
      map((response) => {
        // Mapping and sorting
        this.countryData = response.data
          .map((item: any) => ({
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

        // Extracts all the regions
        this.region = Array.from(
          new Set(this.countryData.map((country) => country.region))
        ).sort();

        // Debugging: Log the populated countryData array.
        console.log('countryData:', this.countryData);

        // Set isLoading to false when loading is complete
        this.isLoading = false;
        console.log('Loading completed');
      }),
      catchError((error) => {
        console.error('Error:', error);
        // Ensure isLoading is set to false even in case of an error
        this.isLoading = false;
        throw error;
      })
    );
  }

  // Returns the loaded country data
  getCountry() {
    return this.countryData;
  }

  // Returns the list of regions
  getRegions(): string[] {
    return this.region;
  }

  // Checks if data is loading
  isLoadingData(): boolean {
    return this.isLoading;
  }
}
