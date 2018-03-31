import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamDetailComponent } from '../common-exam/exam-detail/exam-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainExamComponent } from './main-exam.component';

const routes: Routes = [
  { path: '', component: MainExamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainExamRoutingModule { }
