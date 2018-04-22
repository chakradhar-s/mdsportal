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

    private _proxyHost: string = "https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
    //private _proxyHost: string = "http://localhost:5000/mdservice/api";


    registerUser(user: Registration) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (window.localStorage.getItem('jwt-access-mds')) {
            let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
            headers.append('Authorization', 'bearer ' + rslt.access_token);
        }
        return this.http.post(`${this._proxyHost}/Users`,
            JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                collegeName: user.collegeName,
                emailId: user.emailId,
                whatsAPPNumber: user.whatsAPPNumber,
                mobileNumber: user.mobileNumber,
                referencedBy: user.referencedBy,
                password: user.password,
                state: user.state,
                sYear: user.sYear,
                AcceptedAgreement: user['declarationAcceptance']['is_accepted']
            }),
            new RequestOptions({ headers: headers })).map((response: Response) => {
                return response.json();
            }).catch((error) => {
                return Observable.throw(error);
            });

    }

    updateRegisterUser(user: Registration) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        if (window.localStorage.getItem('jwt-access-mds')) {
            let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
            headers.append('Authorization', 'bearer ' + rslt.access_token);
        }
        return this.http.put(`${this._proxyHost}/Users`,
            JSON.stringify(user),
            new RequestOptions({ headers: headers })).map((response: Response) => {
                return response.json();
            }).catch((error) => {
                return Observable.throw(error);
            });
    }

    getRegisterUser(id: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        if (window.localStorage.getItem('jwt-access-mds')) {
            let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
            headers.append('Authorization', 'bearer ' + rslt.access_token);
        }
        return this.http.get(`${this._proxyHost}/Users/${id}`,
            new RequestOptions({ headers: headers })).map((response: Response) => {
                return response.json();
            }).catch((error) => {
                return Observable.throw(error);
            });
    }

    getUserPic(id: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/vnd.api+json');
        if (window.localStorage.getItem('jwt-access-mds')) {
            let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
            headers.append('Authorization', 'bearer ' + rslt.access_token);
        }
        return this.http.get(`${this._proxyHost}/users/profilepicurl/${id}`,
            new RequestOptions({ headers: headers })).map((response: Response) => {
                return response.json();
            }).catch((error) => {
                return Observable.throw(error);
            });
    }


}
