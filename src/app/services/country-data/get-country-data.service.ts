import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GetCountryDataService {
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor() {}

  // GET request
  get(endpoint: string) {
    const url = `${this.baseUrl}/${endpoint}`;
    return axios.get(url);
  }
}
