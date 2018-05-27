import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'testimonial',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ResultComponent implements OnInit {

  constructor(private spinnerService: Ng4LoadingSpinnerService,config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 1000;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit() {
    this.spinnerService.show();
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }

}
