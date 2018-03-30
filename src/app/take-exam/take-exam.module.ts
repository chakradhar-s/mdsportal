import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { TakeExamRoutingModule } from './take-exam-routing.module';
import { QpaperListComponent } from './qpaper-list/qpaper-list.component';

import { GuardHubModule } from '../guard-hub/guard-hub.module';

@NgModule({
  imports: [
    CommonModule,
    TakeExamRoutingModule,
    TableModule,
    GuardHubModule
  ],
  declarations: [QpaperListComponent]
})
export class TakeExamModule { }
