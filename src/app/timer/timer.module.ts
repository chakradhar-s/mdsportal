import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [TimerComponent],
  exports: [TimerComponent]
})
export class TimerModule { }
