import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoExamComponent } from './demo-exam.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: DemoExamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoExamRoutingModule { }
