import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Registration } from '../../models/registration.interface';
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
export class SignUpService {

    constructor(private http: Http, private router: Router) {

    }

    private _proxyHost: string = "http://localhost:5000";
    //private _proxyHost: string = "/";   

    registerUser(user: Registration) {

        const headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        return this.http.post(`${this._proxyHost}/mdservice/api/Users`,
            JSON.stringify(user),
            new RequestOptions({ headers: headers })).map((response: Response) => {
               return response.json();               
            }).catch((error) => {
                return Observable.throw(error);
            });            

    }

    
}
