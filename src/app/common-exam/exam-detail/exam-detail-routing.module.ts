import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamDetailComponent } from './exam-detail.component';

const routes: Routes = [
  { path: '', component: ExamDetailComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamDetailRoutingModule { }
