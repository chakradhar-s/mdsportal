import { Injectable } from '@angular/core';
import { LoginService } from './login-service.service';
import { RequestOptions, Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserResultsService {

  // private _localHost: string = "https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  private _localHost: string = "http://localhost:5000/mdservice/api";
  // private _localHost: string = "http://localhost:62699/mdservice";
  private _userId: string;

  constructor(
    private loginService: LoginService,
    private http: Http) {
    loginService.userId.subscribe((id) => {
      this._userId = id;
    });
  }

  GetResults(): any {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.get(this._localHost + '/DemoExam/GetResults/' + this._userId,
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  getRank(sessionId : string): any {
    debugger;
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    let url = this._localHost + `/DemoExam/Rank/${sessionId}`;
    
    return this.http.get(url,
      new RequestOptions({ headers: headers }))
      .map((response: Response) =>  response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  };

}
