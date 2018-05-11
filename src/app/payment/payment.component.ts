import { Component, OnInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public currentJustify = 'start';
  public images = ["/assets/images/Fees.png", "/assets/images/Schedule.png"];
  public imageIndex = 0;

  constructor(private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-payments') {
      this.imageIndex = 0;
    }
    else if ($event.nextId === "tab-schedule") {
      this.imageIndex = 1;
    }
  };

}
