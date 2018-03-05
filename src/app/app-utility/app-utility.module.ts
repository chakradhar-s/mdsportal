import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from './tilt.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TiltDirective],
  exports:[TiltDirective]
})
export class AppUtilityModule { }
