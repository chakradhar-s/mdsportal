import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SStrategyRoutingModule } from './s-strategy-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';

import { AppUtilityModule } from '../app-utility/app-utility.module';

@NgModule({
  imports: [
    CommonModule,
    SStrategyRoutingModule,
    AppUtilityModule
  ],
  declarations: [IntroductionComponent]
})
export class SStrategyModule { }
