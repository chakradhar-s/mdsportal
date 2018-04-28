import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromptCompleteVerifyComponent } from './prompt-complete-verify.component';


const routes: Routes = [
  { path: '', component: PromptCompleteVerifyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromptCompleteVerifyRoutingModule { }
