import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    NgbTabsetModule
  ],
  declarations: [PaymentComponent]
})
export class PaymentModule { }
