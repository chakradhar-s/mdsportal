import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoExamComponent } from './demo-exam.component';
import { ExamDetailComponent } from '../common-exam/exam-detail/exam-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: DemoExamComponent },
  { path: 'detail/:id', component: ExamDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoExamRoutingModule { }
