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
import 'rxjs/add/observable/throw';
//import { HexBase64BinaryEncoding } from 'crypto';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LoginService {

  private _userProfile: Profile = { user: { userId: '', collegeName: '', emailId: '', firstName: '', lastName: '', mobileNumber: '', state: '', password: '', referencedBy: '', sYear: null, whatsAPPNumber: '' } };
  private _userToken: string = "";
  private _demoUserToken: string = "";
  private _userType: BehaviorSubject<UserType> = new BehaviorSubject<UserType>({ isAdmin: false, isStudent: false });
  private _userId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _demoUserId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _loginPageRedirection: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _invalidCredentials: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isAdmin = false;
  public isStudent = false;
  public isDemo = false;

  constructor(private http: Http, private router: Router) {

  }

  private _proxyHost: string = "https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  //private _proxyHost: string = "http://localhost:5000/mdservice/api";


  private login(user: Login) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.post(`${this._proxyHost}/Auth/Login`,
      JSON.stringify(user),
      new RequestOptions({ headers: headers })).map((response: Response) =>
        response.json()
      ).catch((error) => {
        return Observable.throw(error);
      }
      );
  }

  validateUser(user: Login) {
    this.login(user).subscribe((res) => {
      let rslt = res;
      let respMes: ResponseMessage = { message: 'logged in successfully', metadata: rslt['id'], status_code: res.status };
      this._userProfile.user = rslt['profile'];
      this._userProfile.user.userId = rslt['id'] || '';
      this._userType.next({ isAdmin: rslt['isAdmin'], isStudent: rslt['isStudent'] });
      this.isAdmin = rslt['isAdmin'];
      this.isStudent = rslt['isStudent'];
      this._userToken = rslt['access_token'];
      this._userId.next(rslt['id'] || '');
      window.localStorage.setItem('jwt-access-mds', JSON.stringify(res));
      this.router.navigate(['view-users', rslt['id']], { replaceUrl: true });
      this._loginPageRedirection.next(false);
    }, (error) => {
      if (!error['ok'] && error['status'] == 401) {
        this._invalidCredentials.next(true);
      }
    }, () => {

    });
  }

  validateDemoUser(user: Login) {
    this.login(user).subscribe((res) => {
      let rslt = res;
      this._demoUserToken = rslt['access_token'];
      this._userId.next(rslt['id'] || '');
      this.isDemo = true;
      window.localStorage.setItem('jwt-demo-access-mds', JSON.stringify(res));
      this._loginPageRedirection.next(false);
    }, (error) => {
      if (!error['ok'] && error['status'] == 401) {
        this._invalidCredentials.next(true);
      }
    }, () => {

    });
  }

  sendResetPassword(userName: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.post(`${this._proxyHost}/Users/ResetPassword`,
      JSON.stringify({ mailId: userName }),
      new RequestOptions({ headers: headers })).map((response: Response) =>
        response.json()
      ).catch((error) => {
        return Observable.throw(error);
      });
  }

  get userToken(): string {
    return this._userToken.toString();
  }

  get demoUserToken(): string {
    return this._demoUserToken.toString();
  }

  get userProfile(): Profile {
    return Object.assign({}, this._userProfile);
  }

  get userType() {
    return this._userType.asObservable();
  }

  get userId() {
    return this._userId.asObservable();
  }

  get demoUserId() {
    return this._demoUserId.asObservable();
  }

  get onLoginFail() {
    return this._invalidCredentials.asObservable();
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
      this._demoUserToken = rslt['access_token'];

      this._userId.next(rslt['id'] || '');
      this._demoUserId.next(rslt['id'] || '');
    }
    else {
      this.logoff();
    }
  }

  get pageRedirectedToLogin() {
    return this._loginPageRedirection.asObservable();
  }

  loginPageRedirect(off: boolean) {
    this._loginPageRedirection.next(off);
  }

  logoff() {
    window.localStorage.setItem('jwt-access-mds', '{}');
    this._userId.next('');
    this._userProfile.user = { userId: '', collegeName: '', emailId: '', firstName: '', lastName: '', mobileNumber: '', password: '', referencedBy: '', sYear: null, state: '', whatsAPPNumber: '' };
    this._userType.next({ isAdmin: false, isStudent: false });
    this._userToken = '';
    this.router.navigate(['/home']);
  }
}
