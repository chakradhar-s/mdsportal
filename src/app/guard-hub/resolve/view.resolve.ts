import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

//import { LoginService } from '../../http-service-registry/services/login-service.service';
import { SignUpService } from '../../http-service-registry/services/signup.service';
import { UserType } from '../../models/user.type.interface';
import { Registration } from '../../models/registration.interface';

@Injectable()
export class ViewResolve implements Resolve<Registration> {

  constructor(private signUpService: SignUpService, private spinnerService: Ng4LoadingSpinnerService) {

  }

  resolve(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.spinnerService.show();
    return this.signUpService.getRegisterUser(next.params['id']);
  }

}
