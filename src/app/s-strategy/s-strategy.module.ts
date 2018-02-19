import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SStrategyRoutingModule } from './s-strategy-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';

@NgModule({
  imports: [
    CommonModule,
    SStrategyRoutingModule
  ],
  declarations: [IntroductionComponent]
})
export class SStrategyModule { }
