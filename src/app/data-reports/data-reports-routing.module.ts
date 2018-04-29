import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RanksComponent } from './ranks/ranks.component';

const routes: Routes = [
  {
    path: 'downloadranks',
    component: RanksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataReportsRoutingModule { }
