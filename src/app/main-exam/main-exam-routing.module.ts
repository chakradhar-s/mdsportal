import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamDetailComponent } from '../common-exam/exam-detail/exam-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainExamComponent } from './main-exam.component';
import { VerifyGuard } from '../guard-hub/verify/verify.guard';

const routes: Routes = [
  { path: '',
   component: MainExamComponent,
   canActivate : [VerifyGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainExamRoutingModule { }
