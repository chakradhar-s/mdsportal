import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pp-books',
  templateUrl: './pp-books.component.html',
  styleUrls: ['./pp-books.component.css'],
  providers: [NgbCarouselConfig]
})
export class PpBooksComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 1000;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit() {    
  }
  
}
