import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginComponent } from '../../login-user/login/login.component';

@Injectable()
export class LoginGuard implements CanActivate, CanDeactivate<LoginComponent> {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canDeactivate(component, currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot) {
    if (('/' + nextState.root.firstChild.routeConfig.path).indexOf("/login/user") > -1 && currentState.url.indexOf("/login/user") > -1) {
      component.loginservice.loginPageRedirect(true);
    } else {
      component.loginservice.loginPageRedirect(false);
    }
    return true;
  }
}
