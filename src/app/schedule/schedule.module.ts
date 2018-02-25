import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

import { PpBooksComponent } from '../pp-books/pp-books.component';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ],
  declarations: [ScheduleComponent,PpBooksComponent]
})
export class ScheduleModule { }
