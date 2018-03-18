import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginGuard } from './login/login.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [LoginGuard]
})
export class GuardHubModule { }
