import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor() {}

  // GET request
  async get(endpoint: string): Promise<AxiosResponse<any>> {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      return await axios.get(url);
    } catch (error) {
      console.log('Error getting countries', error);
      throw error;
    }
  }
}
