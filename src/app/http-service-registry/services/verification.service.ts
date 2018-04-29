import { Injectable } from '@angular/core';
import { LoginService } from './login-service.service';

import { RequestOptions, Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ExamService } from './exam.service';
import 'rxjs/add/observable/empty';

@Injectable()
export class VerificationService {

  private _userId: string;
  private _proxyHost: string = "http://localhost:5000/mdservice/api";

  constructor(private loginService: LoginService, private http: Http) {
    loginService.userId.subscribe((id) => {
      this._userId = id;
    });
  }

  getEmailVerificationStatus() {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.get(this._proxyHost + '/Users/emailverificationstatuses/',
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  sendEmailVerification() {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.post(this._proxyHost + '/Users/emailverificationstatuses/',
      null, new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  getMobileVerificationStatus() {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.get(this._proxyHost + '/Users/mobileverificationstatuses/',
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  sendMobileVerification() {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.post(this._proxyHost + '/Users/mobileverificationstatuses/',
      null, new RequestOptions({ headers: headers }))
      .map((response: Response) => {
        debugger;
        return response.json();
      })
      .catch((error) =>
        Observable.throw(error)
      );
  }

  submitMobileVerification(otp: string) {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.post(this._proxyHost + '/auth/verifymobilenumber/',
      JSON.stringify({
        otp: otp
      }), new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  getVerifyAllVerificationsCompleted() {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.get(this._proxyHost + '/Users/isEmailAndMobileVerificationComplete/',
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  checkMobileNumberAvailable(mobileNumber: string) {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.get(this._proxyHost + '/Users/checkmobilenumber?mobileNumber=' + mobileNumber,
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  checkEmailIdAvailable(emailId: string) {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.get(this._proxyHost + '/Users/checkemailId?emailId=' + emailId,
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

}
