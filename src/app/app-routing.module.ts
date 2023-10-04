import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  //Home
  {
    component: CountriesComponent,
    path: '',
  },
  //View country
  {
    component: CountryComponent,
    path: 'country/:id',
  },
  //favaourites
  {
    component: FavoritesComponent,
    path: 'favorites',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
