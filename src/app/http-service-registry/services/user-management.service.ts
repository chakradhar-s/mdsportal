import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserManagementService {
  private userStatus: UserActiveStatus = new UserActiveStatus();
  private _proxyHost: string = "http://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  // private _proxyHost: string = "http://localhost:5000/mdservice/api";

  constructor(private http: Http) { }

  getUsers(pageNo: number, size: number, search: string) {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.get(this._proxyHost + `/Users/GetPagedUsers/?PageSize=${size}&PageNumber=${pageNo}&Search=${search}`,
      new RequestOptions({ headers: headers }))
      .map((response: Response) => {
        let result = response.json();

        result.users = response.json().users.map((u) => {
          if (u.created_at && u.created_at.length) {
            let d = new Date(u.created_at);
            let dateString = d.getDate() + " - " + d.getMonth() + " - " + d.getFullYear();
            u.created_at = dateString;
          }
          if (typeof u.user_status == "number") {
            u.user_status = this.userStatus.getEnumName(u.user_status);
          }
          return u;
        });
        return result;
      })
      .catch((error) =>
        Observable.throw(error)
      );
  }

  deleteUsers(userids: Array<string>) {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.delete(this._proxyHost + `/Users/DeleteUsers`,
      new RequestOptions({
        headers: headers,
        body: JSON.stringify({
          "userIds": userids
        })
      }))
      .map((response: Response) => { return response.json(); })
      .catch((error) => {
        return Observable.throw(error)
      }
      );
  }

}
export class UserActiveStatus {
  private status = {
    Suspended: 0,
    VerficationIncomplete: 1,
    EmailVerificationDone: 2,
    MobileVerificationDone: 3,
    OverAllVerificationDone: 2 + 3
  }

  constructor() { }

  public getEnumName(value: number): string {
    return Object.keys(this.status).find(k => this.status[k] === value);
  }
}
