import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../../http-service-registry/services/login-service.service';
import { UserType } from '../../models/user.type.interface';

@Injectable()
export class ViewUserGuard implements CanActivate {

  private _isAdmin = false;
  private _isStudent = false;
  private _userId: string = '';
  constructor(private loginService: LoginService) {
    loginService.userType.subscribe((userType: UserType) => {
      this._isAdmin = userType.isAdmin;
      this._isStudent = userType.isStudent;
    });
    loginService.userId.subscribe((id) => {
      this._userId = id;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._isAdmin) {
      return true;
    }
    else {
      return next.params.id == this._userId;
    }    
  }
}
