import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { PromptCompleteVerifyComponent } from './prompt-complete-verify.component';
import { PromptCompleteVerifyRoutingModule } from './prompt-complete-verify-routing.module';


@NgModule({
  imports: [
    CommonModule,
    NgbTabsetModule,
    PromptCompleteVerifyRoutingModule
  ],
  declarations: [PromptCompleteVerifyComponent]
})
export class PromptCompleteVerifyModule { }
