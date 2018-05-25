import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionPaper } from '../modals/questionpaper';

import { QuestionPaper as qp } from '../models/question-paper.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Promise } from 'q';
import { RequestOptions, Http, Response, Headers } from '@angular/http';


@Injectable()
export class QuestionpaperService {

  constructor(private http: Http) { }


  // private _proxyHost: string = "https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  private _proxyHost: string = "http://localhost:5000/mdservice/api";


  // GetAllQuestionSet(): Observable<QuestionPaper[]> {
  //   return this.http.get<QuestionPaper[]>(`${this._proxyHost}/uploaddocument/all-questions`);
  // }

  getAllPapersPaged(pageNo: number, size: number, search: string) {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
  
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.get(this._proxyHost + `/uploaddocument/all-questions-paged/?PageSize=${size}&PageNumber=${pageNo}&Search=${search}`,
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  }

  getAvailableQuestionPapers(): Observable<qp[]> {
    return this.http.get(`${this._proxyHost}/uploaddocument/all-questions`).map((response) => {
      return response.json();
    }).catch((error) => {
      return Observable.throw(error);
    });
  }

  EnableOrDisableQuestionPapers(questionArray: QuestionPaper[]): Observable<any> {
    return this.http.post(`${this._proxyHost}/uploaddocument/activate-questions`, questionArray);
  }


}
