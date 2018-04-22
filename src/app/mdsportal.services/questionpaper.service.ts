import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionPaper } from '../modals/questionpaper';

import { QuestionPaper as qp } from '../models/question-paper.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Promise } from 'q';


@Injectable()
export class QuestionpaperService {

  constructor(private http: HttpClient) { }


  private _proxyHost: string = "https://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
 //private _proxyHost: string = "http://localhost:5000/mdservice/api";


  GetAllQuestionSet(): Observable<QuestionPaper[]> {
    return this.http.get<QuestionPaper[]>(`${this._proxyHost}/uploaddocument/all-questions`);
  }

  getAvailableQuestionPapers(): Observable<qp[]> {
    return this.http.get(`${this._proxyHost}/uploaddocument/all-questions`).map((response) => {
      return response;
    }).catch((error) => {
      return Observable.throw(error);
    });
  }

  EnableOrDisableQuestionPapers(questionArray: QuestionPaper[]): Observable<any> {
    return this.http.post(`${this._proxyHost}/uploaddocument/activate-questions`, questionArray);
  }


}
