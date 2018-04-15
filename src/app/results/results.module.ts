import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from 'primeng/chart';

import { ResultsRoutingModule } from './results-routing.module';
import { TestimonialsStudentsComponent } from './testimonials-students/testimonials-students.component';

import { AppUtilityModule } from '../app-utility/app-utility.module';
import { SubjectAnalysisComponentComponent } from './subject-analysis-component/subject-analysis-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ResultsRoutingModule,
    AppUtilityModule,
    NgbModule,
    ChartModule
  ],
  declarations: [TestimonialsStudentsComponent, SubjectAnalysisComponentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultsModule { }
