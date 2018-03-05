import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

import { PpBooksComponent } from '../pp-books/pp-books.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    NgbModule
  ],
  declarations: [ScheduleComponent,PpBooksComponent],
  exports:[ScheduleComponent,PpBooksComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ScheduleModule { }
