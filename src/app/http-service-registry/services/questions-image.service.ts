import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class QuestionsImageService {

  private _proxyHost: string = "http://localhost:5000/mdservice/api";

  constructor(private http: Http) {

  }

  public getQuestionsImage(): Observable<string[]> {

    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.get(this._proxyHost + '/UploadDocument/questionpapersimages',
      new RequestOptions({ headers: headers }))
      .map((response: Response) => {
        return (response.json()).pathS;
      })
      .catch((error) =>
        Observable.throw(error)
      );
  };

}
