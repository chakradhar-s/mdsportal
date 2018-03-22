import { Injectable } from '@angular/core';
import { QuestionSet, QuestionOutput, QuestionResult } from '../../models/question-set';
// import { QUESTION_SET } from '../../models/mock-content';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
// import { AnswerSet } from '../../models/answer-set';
import { HttpClient } from '@angular/common/http';
import { RelExamAnswer, StatusId } from '../../models/rel-exam-answer.interface';

@Injectable()
export class ExamService {

  private _localHost: string = "http://localhost:5000/mdservice";
  //private _localHost: string = "http://localhost:62699/mdservice";
  // private _localHost: string = "/mdservice";
  private _activeQuestionPaper_id: string = "0fbb86f6-cece-4c32-b795-4ecae57080e7"; // here need to keep active question_paper_id during deployment
  // private _activeQuestionPaper_id : string = "0fbb86f6-cece-4c32-b795-4ecae57080e7";
  //private _activeSession_id: string = "1908d1b0-276e-11e8-bd47-0252c1ad21ae";
  private _activeSession_id: string = "";

  private _testObservable: Observable<QuestionOutput[]>;

  constructor(private http: Http, ) { }

  startSession(examType: number) {
    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');

    return this.http.post(this._localHost + '/api/exam/startsession',
      JSON.stringify({ questionPaperId: this._activeQuestionPaper_id, "examType": examType }),
      new RequestOptions({ headers: headers }))
      .flatMap(token => {
        this._activeSession_id = (token.json())["exam_token"];
        return this.getQuestions();
      });
  }

  private getQuestions(): Observable<QuestionOutput[]> {

    const headers = new Headers();
    if (this._activeSession_id.length > 0) {
      headers.append('Authorization', 'bearer ' + this._activeSession_id);
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.get(this._localHost + '/api/DemoExam/GetQuestionPaperCombo/',
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  };

  updateQuestion(ques_id: string, ans: RelExamAnswer): void {
    // var ques_id;
    // var ans;
    debugger;
    let d = this.getQuestions()
      .map(x =>
        x.map(j =>
          j.questionsResult.findIndex(x => x.questionId == ques_id)

          // .map(q => {
          //   if (q.question_id == ques_id) {
          //     q.selectedAnswer = ans
          //   }
          // })
        )
      );
  }

  getSelectedQuestion(id: string): Observable<QuestionResult> {
    return this.getQuestions()
      .map(res => {
        let q = res.map(d => {
          debugger;
          return d.questionsResult.find(j => j.questionId == id)
        });
        return q[0];
        //  let ar =  res.forEach(item => {
        //    if( item.questionResult.map(x => x.fin question_id == id))
        //  let d = item.questionResult.find(fil => fil.question_id == id)
        // })
      })
      .catch((error) =>
        Observable.throw(error)
      );

    // return this.getQuestions().map(ques => ques.find(t => t.question_index === id));
  }

  insertOrUpdateAnswer(ans: RelExamAnswer, statusId: StatusId): void {
    try {
      debugger;
      const headers = new Headers();
      ans.selectedOptionStatusId = statusId;
      let data = JSON.stringify(ans);
      headers.append('Content-Type', 'application/vnd.api+json');
      let test = this.http.post(this._localHost + '/api/DemoExam/Save', data,
        new RequestOptions({ headers: headers })).subscribe(res => console.log(res));
      console.log(test)
    }
    catch (error) {
      debugger;
      console.log(error)
    }
    // this.http.post(this._localHost + '/api/DemoExam/Save',
    //   new RequestOptions({ headers: headers,body:ans }))
    //   .map((response: Response) => {
    //     let rslt = response.json();
    //     // return rslt;
    //   })
    //   .catch((error) =>
    //     Observable.throw(error)
    //   );
    // this.httpClient.post(this._localHost + '/api/DemoExam/Save',JSON.stringify(ans),null)
    // this.http.post(`${this._localHost}/api/DemoExam/Save`,
    // JSON.stringify(ans),
    // new RequestOptions({ headers: headers })).map((response: Response) =>
    //   response.json()
    // ).catch((error) =>
    //   Observable.throw(error)
    // );
  }

}
