import { Injectable } from '@angular/core';
import { LoginService } from './login-service.service';
import { RequestOptions, Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ExamService } from './exam.service';
import 'rxjs/add/observable/empty';

@Injectable()
export class UserResultsService {

  //private _proxyHost: string = "https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  private _proxyHost: string = "http://localhost:5000/mdservice/api";
  
  private _userId: string;

  constructor(
    private loginService: LoginService,
    private examService : ExamService,
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

    return this.http.get(this._proxyHost + '/DemoExam/GetResults/' + this._userId,
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  getRank(sessionId : string): any {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    let url = this._proxyHost + `/DemoExam/Rank/${sessionId}`;
    
    return this.http.get(url,
      new RequestOptions({ headers: headers }))
      .map((response: Response) =>  response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  };

  currentSessionResult(): any{
    const headers = new Headers();
    if (this.examService.activeSession.length) {
      headers.append('Authorization', 'bearer ' + this.examService.activeSession);
      headers.append('Content-Type', 'application/vnd.api+json');
      let url = this._proxyHost + `/DemoExam/Rank/current`;
      
      return this.http.get(url,
        new RequestOptions({ headers: headers }))
        .map((response: Response) =>  response.json())
        .catch((error) =>
          Observable.throw(error)
        );
    }

    return Observable.empty<Response>();
   
  }

}
