import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guard-hub/auth/auth.guard';
import { ViewResolve } from '../guard-hub/resolve/view.resolve';

import { ViewUserGuard } from '../guard-hub/view-user/view-user.guard';

import {ResultsComponent} from './results/results.component';

const routes: Routes = [
  {
    path: 'view-users/:id',
    component: ProfileComponent,
    canLoad: [AuthGuard],
    canActivate: [ViewUserGuard],
    resolve: { user: ViewResolve }
  },
  {
    path: 'view-results/:id',
    component: ResultsComponent,
    canLoad: [AuthGuard],
    canActivate: [ViewUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {

}
