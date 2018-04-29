import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataReportsRoutingModule } from './data-reports-routing.module';
import { RanksComponent } from './ranks/ranks.component';

@NgModule({
  imports: [
    CommonModule,
    DataReportsRoutingModule
  ],
  declarations: [RanksComponent],
  exports: [RanksComponent]
})
export class DataReportsModule { }
