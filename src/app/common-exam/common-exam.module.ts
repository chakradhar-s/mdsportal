import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ExamDetailComponent } from './exam-detail/exam-detail.component';

import { StartPageComponent } from './start-page/start-page.component';

import { TimerModule } from '../timer/timer.module'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TimerModule
  ],
  declarations: [ExamDetailComponent, StartPageComponent],
  exports: [ExamDetailComponent, StartPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommonExamModule { }
