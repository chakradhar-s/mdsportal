import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoginService } from '../../http-service-registry/services/login-service.service';

@Component({
  selector: 'app-password-link',
  templateUrl: './password-link.component.html',
  styleUrls: ['./password-link.component.scss']
})
export class PasswordLinkComponent implements OnInit {

  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private login: LoginService) { }

  ngOnInit() {
    this.spinnerService.show();
  }

  ngAfterViewInit() {
    this.spinnerService.hide();
    this.login.loginPageRedirect(true);
  }

}
