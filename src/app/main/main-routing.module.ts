import { ApodDetailsComponent } from './apod-details/apod-details.component';
import { ApodComponent } from './apod/apod.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/apod', pathMatch: 'full' },
  { path: 'apod', component: ApodComponent },
  { path: 'apod/:date', component: ApodDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
