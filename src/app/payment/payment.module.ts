import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { ScheduleModule } from '../schedule/schedule.module';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    NgbTabsetModule,
    ScheduleModule
  ],
  declarations: [PaymentComponent]
})
export class PaymentModule { }
