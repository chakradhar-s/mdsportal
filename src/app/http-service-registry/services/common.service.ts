import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {
  private _proxyHost: string = "http://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  //private _proxyHost: string = "http://localhost:5000/mdservice/api";
  constructor(private http: Http) { }

  GetInTouch(form : any){
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/vnd.api+json');
      let data = JSON.stringify(form);
      return this.http.post(this._proxyHost + '/Users/GetInTouch', data,
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
