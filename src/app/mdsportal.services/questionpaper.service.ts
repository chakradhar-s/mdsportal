import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionPaper } from '../modals/questionpaper';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionpaperService {

  constructor(private http:HttpClient) { }

  private _localHost: string = "http://localhost:5000/";
  //private _localHost: string = "http://localhost:62699/";

  GetAllQuestionSet(): Observable<QuestionPaper[]> {
   return this.http.get<QuestionPaper[]>(`${this._localHost}mdservice/api/uploaddocument/all-questions`);
  }
  
  EnableOrDisableQuestionPapers(questionArray : QuestionPaper[]) : Observable<any>{
    return this.http.post(`${this._localHost}mdservice/api/uploaddocument/activate-questions`,questionArray);
  }

  
}
