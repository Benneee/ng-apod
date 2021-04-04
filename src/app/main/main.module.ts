import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ApodComponent } from './apod/apod.component';
import { ApodDetailsComponent } from './apod-details/apod-details.component';

@NgModule({
  declarations: [ApodComponent, ApodDetailsComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
