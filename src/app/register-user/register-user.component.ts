import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, AfterViewInit {
  private acceptUserAggrement: boolean = false;

  constructor(private spinnerService: Ng4LoadingSpinnerService) { 

  }

  ngOnInit() {
    this.spinnerService.show();
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }
}
