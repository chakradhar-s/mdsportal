import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataReportsService {

  constructor(private http: Http, private router: Router) {

  }

  //private _proxyHost: string = "https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  private _proxyHost: string = "http://localhost:5000/mdservice/api";


  getRankReports() {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.get(this._proxyHost + '/analysis/examreports',
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response)
      .catch((error) =>
        Observable.throw(error)
      );
  }

}