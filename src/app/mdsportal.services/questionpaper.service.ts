import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionPaper } from '../modals/questionpaper';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionpaperService {

  constructor(private http:HttpClient) { }


  GetAllQuestionSet(): Observable<QuestionPaper[]> {
   return this.http.get<QuestionPaper[]>("http://localhost:62699/mdservice/api/uploaddocument/all-questions");
  }
  
  EnableOrDisableQuestionPapers(questionArray : QuestionPaper[]) : Observable<any>{
    return this.http.post('http://localhost:62699/mdservice/api/uploaddocument/activate-questions',questionArray);
  }

  
}
