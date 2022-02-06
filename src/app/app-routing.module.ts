import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListingComponent } from './components/listing/listing.component';

const appRoutes: Routes = [
  { path: '',component: HomePageComponent,data: {title: 'Home',}},
  { path: 'list', component: ListingComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
