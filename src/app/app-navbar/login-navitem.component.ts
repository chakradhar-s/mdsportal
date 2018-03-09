import { Component, Input } from '@angular/core';

import { Nav } from '../models/nav.interface';
import { LoginService } from '../http-service-registry/services/login-service.service';
import { UserType } from '../models/user.type.interface';
import { ProfileAccordion } from '../models/profile-accordion.interface';

import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login-item',
  templateUrl: './login-navitem.component.html'
})
export class LoginNavItem {
  @Input()
  profileDetails: ProfileAccordion;
  
  constructor(private route: ActivatedRoute,
    private router: Router, ) {

  }

  public takeroute(link, event) {
    this.router.navigate([link]);
  }
}