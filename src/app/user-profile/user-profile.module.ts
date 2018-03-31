import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { GuardHubModule } from '../guard-hub/guard-hub.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultsComponent } from './results/results.component';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    GuardHubModule,
    TableModule,
    NgbModule
  ],
  declarations: [ProfileComponent, ResultsComponent]
})
export class UserProfileModule { }
