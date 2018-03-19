import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guard-hub/auth/auth.guard';
import { ViewResolve } from '../guard-hub/resolve/view.resolve';

import { ViewUserGuard } from '../guard-hub/view-user/view-user.guard';

const routes: Routes = [
  {
    path: 'view-user/:id',
    component: ProfileComponent,
    canLoad: [AuthGuard],
    canActivate: [ViewUserGuard],
    resolve: { user: ViewResolve }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {

}
