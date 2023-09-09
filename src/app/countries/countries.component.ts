import { Component } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent {
  itemsPerPage: number = 5; // Default items per page

  // Replace this array with your actual data source
  data: any[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  // Initialize the current page
  currentPage: number = 1;

  // Function to handle the change in items per page
  onItemsPerPageChange(): void {
    this.currentPage = 1; // Reset to the first page when items per page changes
  }

  // Function to get the paginated data based on current page and items per page
  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  // Function to handle page change
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
