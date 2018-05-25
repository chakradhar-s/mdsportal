import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VerificationService } from '../../http-service-registry/services/verification.service';
import 'rxjs/add/operator/map';
import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class VerifyGuard implements CanActivate {

  private _isVerificationCompleted: boolean = false;
  private _isVerificationObserver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);


  constructor(private verifyService: VerificationService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
 
    return this.verifyService.getVerifyAllVerificationsCompleted().map(e => {
      if (e.verified) {
        return true;
      }
      this.router.navigate(['complete-verification']);
      return false;
    }).catch(() => {
      this.router.navigate(['complete-verification']);
      return Observable.of(false);
    });
  }

}
