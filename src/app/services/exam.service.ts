import { Injectable } from '@angular/core';
import { QuestionSet } from '../models/question-set';
import { QUESTION_SET } from '../models/mock-content';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ExamService {

  // private _localHost: string = "http://localhost:5000/mdservice";
  private _localHost: string = "http://localhost:62699/mdservice";
  private _activeQuestionPaper_id: string = "51b60fc8-df2d-2dd2-0ab3-b5ee1b2b8060"; // here need to keep active question_paper_id during deployment
  // private _activeQuestionPaper_id : string = "8d695fb2-d0b7-0ac8-087a-ae11eca6e346";
  
  constructor(private http: Http) { }

  getQuestions(): Observable<QuestionSet[]> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.get(this._localHost + '/api/DemoExam/GetQuestionPaper/' + this._activeQuestionPaper_id,
      new RequestOptions({ headers: headers }))
      .map((response: Response) => {
        let rslt = response.json();
        return rslt;
      })
      .catch((error) =>
        Observable.throw(error)
      );
  };

  getSelectedQuestion(id: number): Observable<QuestionSet> {
    return this.getQuestions().map(ques => ques.find(t => t.question_index === id));
  }

}
