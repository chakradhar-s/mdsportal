import { Component, Input } from '@angular/core';

import { Nav } from '../models/nav.interface';
import { LoginService } from '../http-service-registry/services/login-service.service';
import { UserType } from '../models/user.type.interface';
import { ProfileAccordion } from '../models/profile-accordion.interface';

import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { Registration } from '../models/registration.interface';

@Component({
  selector: 'app-login-item',
  templateUrl: './login-navitem.component.html'
})
export class LoginNavItem {
  @Input()
  profileDetails: ProfileAccordion;

  @Input()
  user: Registration;

  public showStyle: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router, private _login: LoginService) {

  }

  public takeroute(link, event) {
    this.showStyle=!this.showStyle;
    this.router.navigate([link]);
  }

  public logoff() {
    this._login.logoff();
  }
}