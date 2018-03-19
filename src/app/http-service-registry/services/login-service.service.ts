import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Login } from '../../models/login.interface';
import { Profile } from '../../models/profile.interface';
import { ResponseMessage } from '../../models/response.message.interface';
import { UserType } from '../../models/user.type.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/throw';
//import { HexBase64BinaryEncoding } from 'crypto';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LoginService {

  private _userProfile: Profile = { user: { college: '', emailId: '', firstName: '', lastName: '', mobileNumber: '', password: '', referencedBy: '', sYear: null, whatsAPPNumber: '' } };
  private _userToken: string = "";
  private _userType: BehaviorSubject<UserType> = new BehaviorSubject<UserType>({ isAdmin: false, isStudent: false });
  private _userId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: Http, private router: Router) {

  }

  //private _proxyHost: string = "http://localhost:5000";
  private _proxyHost: string = "/";
  private login(user: Login) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.post(`${this._proxyHost}/mdservice/api/Auth/Login`,
      JSON.stringify(user),
      new RequestOptions({ headers: headers })).map((response: Response) =>
        response.json()
      ).catch((error) =>
        Observable.throw(error)
      );
  }

  validateUser(user: Login) {
    this.login(user).subscribe((res) => {
      let rslt = res;
      let respMes: ResponseMessage = { message: 'logged in successfully', metadata: rslt['id'], status_code: res.status };
      this._userProfile.user = rslt['profile'];
      this._userType.next({ isAdmin: rslt['isAdmin'], isStudent: rslt['isStudent'] });
      this._userToken = rslt['access_token'];
      this._userId.next(rslt['id'] || '');
      window.localStorage.setItem('jwt-access-mds', JSON.stringify(res));
      this.router.navigate(['/register/user'], { replaceUrl: true });
    }, (error) => console.error(error), () => {

    });
  }

  get userToken(): string {
    return this._userToken.toString();
  }

  get userProfile(): Profile {
    return Object.assign({}, this._userProfile);
  }

  get userType() {
    return this._userType.asObservable();
  }

  get userId() {
    return this._userType.asObservable();
  }

  logOut() {
    this._userType.next({ isAdmin: false, isStudent: false });
    window.localStorage.setItem('jwt-access-mds', null);
  }

  reloadUser() {
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      let respMes: ResponseMessage = { message: 'logged in successfully', metadata: rslt['id'], status_code: rslt['status'] || '' };
      this._userProfile.user = rslt['profile'];
      this._userType.next({ isAdmin: rslt['isAdmin'], isStudent: rslt['isStudent'] });
      this._userToken = rslt['access_token'];
      this._userId.next(rslt['id'] || '');
    }
  }

}
