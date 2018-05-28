import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../../http-service-registry/services/login-service.service';
import { UserType } from '../../models/user.type.interface';


@Injectable()
export class AuthGuard implements CanActivate {
  private _isAdmin = false;
  private _isStudent = false;
  constructor(private loginService: LoginService) {

    this._isAdmin = loginService.isAdmin;
    this._isStudent = loginService.isStudent;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  canLoad() {
    return true;
  }
}
