import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants';

@Injectable()
export class ChatBotService {
  
  private _proxyHost: string = Constants.API_URL;

  constructor(private http: Http) { }


  ChatBotComments(comment: string) {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/vnd.api+json');
      let data = { 'comment': comment };
      return this.http.post(this._proxyHost + '/ChatBot/GetAnswers', data,
        new RequestOptions({ headers: headers }))
        .map((response: Response) => {
          return response.json();
        })
        .catch((error) => Observable.throw(error))
    }
    catch (error) {
      console.log(error)
    }
  }

}
