import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalysisStudentComponent } from './analysis-students/analysis-students.component';
import { VerifyGuard } from '../guard-hub/verify/verify.guard';

const routes: Routes = [{ 
  path: '', 
  component: AnalysisStudentComponent, 
  canActivate : [VerifyGuard] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsRoutingModule { }
