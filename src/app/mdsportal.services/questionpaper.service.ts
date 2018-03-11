import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionPaper } from '../modals/questionpaper';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionpaperService {

  constructor(private http:HttpClient) { }


  GetAllQuestionSet(): Observable<QuestionPaper[]> {
   return this.http.get<QuestionPaper[]>("http://localhost:62700/mdservice/api/uploaddocument/all-questions");
  }
  

}
