import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guard-hub/auth/auth.guard';
import { ViewQuestionPapersResolve } from '../guard-hub/resolve/view-questionpapers.resolve';


import { QpaperListComponent } from './qpaper-list/qpaper-list.component';
import { VerifyGuard } from '../guard-hub/verify/verify.guard';

const routes: Routes = [
  {
    path: '',
    component: QpaperListComponent,
    canLoad: [AuthGuard, VerifyGuard],
    canActivate : [VerifyGuard],
    resolve: { questionPapers: ViewQuestionPapersResolve }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TakeExamRoutingModule { }
