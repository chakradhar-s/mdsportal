import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { GuardHubModule } from '../guard-hub/guard-hub.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultsComponent } from './results/results.component';

import { TableModule } from 'primeng/table';
import { DataTableModule } from 'primeng/datatable';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { UploadQuestionsImageModule } from '../upload-questions-image/upload-questions-image.module';
import { UserManagementComponent } from './user-management/user-management.component';




@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    GuardHubModule,
    TableModule,
    NgbModule,
    UploadQuestionsImageModule,
    DataTableModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService
  ],
  declarations: [ProfileComponent, ResultsComponent, UserManagementComponent]
})
export class UserProfileModule { }
