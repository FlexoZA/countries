import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  //Home
  {
    component: CountriesComponent,
    path: '',
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
