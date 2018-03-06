import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Login } from '../models/login.interface';
import { Profile } from '../models/profile.interface';
import { ResponseMessage } from '../models/response.message.interface';
import { UserType } from '../models/user.type.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/throw';
//import { HexBase64BinaryEncoding } from 'crypto';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LoginService {

  private _userProfile: Profile;
  private _userToken: string;
  private _userType: BehaviorSubject<UserType> = new BehaviorSubject<UserType>({ isAdmin: false, isStudent: false });

  constructor(private http: Http) {

  }

  private _proxyHost: string = "http://localhost:5000";
  validateUser(user: Login): Observable<ResponseMessage> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.post(`${this._proxyHost}/mdservice/api/Auth/Login`, JSON.stringify(user), new RequestOptions({ headers: headers })).map((response: Response) => {
      let rslt = response.json();
      let respMes: ResponseMessage = { message: 'logged in successfully', metadata: rslt['id'], status_code: response.status };
      this._userProfile.user = rslt['profile'];
      this._userType.next({ isAdmin: rslt['isAdmin'], isStudent: rslt['isStudent'] });
      return respMes;
    }
    ).catch((error) =>
      Observable.throw(error)
      );
  }

  getUserToken(): string {
    return this._userToken;
  }

  getUserProfile(): Profile {
    return this._userProfile;
  }

  getUserType() {
    return this._userType.asObservable();
  }

  logOut() {
    this._userType.next({ isAdmin: false, isStudent: false });
  }

}
