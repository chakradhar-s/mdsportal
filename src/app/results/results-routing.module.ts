import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalysisStudentComponent } from './analysis-students/analysis-students.component';

const routes: Routes = [{ path: '', component: AnalysisStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
