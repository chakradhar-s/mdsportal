import { Injectable } from '@angular/core';
import { QuestionSet } from '../../models/question-set';
import { QUESTION_SET } from '../../models/mock-content';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import { AnswerSet } from '../../models/answer-set';
import {HttpClient} from '@angular/common/http';
import { RelExamAnswer } from '../../models/rel-exam-answer';

@Injectable()
export class ExamService {

  // private _localHost: string = "http://localhost:5000/mdservice";
  private _localHost: string = "http://localhost:62699/mdservice";
  // private _localHost: string = "/mdservice";
  private _activeQuestionPaper_id: string = "19e77789-3537-e1cb-c6c1-9e6fe5d263af"; // here need to keep active question_paper_id during deployment
  // private _activeQuestionPaper_id : string = "8d695fb2-d0b7-0ac8-087a-ae11eca6e346";

  constructor(private http: Http, private httpClient : HttpClient) { }

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

  insertOrUpdateAnswer(ans: RelExamAnswer): void {
    debugger;
    const headers = new Headers();
    let data = JSON.stringify(ans);
    headers.append('Content-Type', 'application/vnd.api+json');
    // this.http.post(this._localHost + '/api/DemoExam/Save', JSON.stringify(ans),
    //   new RequestOptions({ headers: headers })).catch((error) => { debugger; return Observable.throw(error) });
    // this.http.post(this._localHost + '/api/DemoExam/Save',
    //   new RequestOptions({ headers: headers,body:ans }))
    //   .map((response: Response) => {
    //     let rslt = response.json();
    //     // return rslt;
    //   })
    //   .catch((error) =>
    //     Observable.throw(error)
    //   );
this.httpClient.post(this._localHost + '/api/DemoExam/Save',JSON.stringify(ans),null)
    // this.http.post(`${this._localHost}/api/DemoExam/Save`,
    // JSON.stringify(ans),
    // new RequestOptions({ headers: headers })).map((response: Response) =>
    //   response.json()
    // ).catch((error) =>
    //   Observable.throw(error)
    // );
  }

}
