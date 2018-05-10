import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VerificationService } from '../../http-service-registry/services/verification.service';

@Injectable()
export class VerifyGuard implements CanActivate {

  private _isVerificationCompleted: boolean = false;

  constructor(verifyService: VerificationService, private router : Router) {
    
    verifyService.getVerifyAllVerificationsCompleted().subscribe((response) => {
      debugger;
      this._isVerificationCompleted = response.verified;
    }, (error) => {
      this._isVerificationCompleted = false;
    });

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.nagivate();
  }

  canLoad() {
    console.log(new Date(), "verified user can load");
    return this.nagivate();
  }

  private nagivate(){
    if (!this._isVerificationCompleted) {
      // uncomment this lines during prod
      this.router.navigate(['complete-verification']);
      return false; 
    }
    return true;
  }
}
