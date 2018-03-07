import { Injectable } from '@angular/core';
import { QuestionSet } from '../models/question-set';
import { QUESTION_SET } from '../models/mock-content';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ExamService {

  // private _localHost: string = "http://localhost:5000/mdservice";
  private _localHost: string = "http://localhost:62699/mdsservice";
  // private _localHost: string = "http://localhost:62699";
  private _activeQuestionPaper_id : string = "8d695fb2-d0b7-0ac8-087a-ae11eca6e346";

  constructor(private http: Http) { }

  getQuestions(): Observable<QuestionSet[]> {
    debugger;
    const headers = new Headers();
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.post(this._localHost + '/api/DemoExam/GetQuestionPaper/' + this._activeQuestionPaper_id,
     null, new RequestOptions({ headers: headers })).map((response: Response) => {
      let rslt = response.json();
      // let respMes: ResponseMessage = { message: 'logged in successfully', metadata: rslt['id'], status_code: response.status };
      // this._userProfile.user = rslt['profile'];
      // this._userType.next({ isAdmin: rslt['isAdmin'], isStudent: rslt['isStudent'] });
      return rslt;
    }
    );
    // .catch((error) =>
    //   Observable.throw(error.json())
    //   );
  };

  getSelectedQuestion(id: number): Observable<QuestionSet> {
    // return of(QUESTION_SET.filter(x => x.question_id == id).)
    return this.getQuestions().map(ques => ques.find(t => t.question_index === id));
  }

}
