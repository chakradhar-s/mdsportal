import { Component } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoginService } from './http-service-registry/login-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(
    private spinnerService: Ng4LoadingSpinnerService, private login: LoginService
  ) {

  }

  ngOnInit() {
    this.spinnerService.show();
    this.login.reloadUser();
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }
}
