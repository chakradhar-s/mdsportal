import { Injectable } from '@angular/core';
import { QuestionSet, QuestionOutput, QuestionResult } from '../../models/question-set';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RelExamAnswer, StatusId } from '../../models/rel-exam-answer.interface';

@Injectable()
export class ExamService {

  private _localHost: string = "http://localhost:5000/mdservice";

  // private _activeQuestionPaper_id: string = "1ca48a34-3866-034a-c953-6a324a64feb0"; // here need to keep active question_paper_id during deployment
  private _activeQuestionPaper_id: string = "2073d3fb-09ef-e068-62f6-6b262b211797";
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
    let d = this.getQuestions()
      .map(x =>
        x.map(j =>
          j.questionsResult.findIndex(x => x.questionId == ques_id)
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
      })
      .catch((error) =>
        Observable.throw(error)
      );
  }

  insertOrUpdateAnswer(ans: RelExamAnswer) {
    try {
      const headers = new Headers();
      if (this._activeSession_id.length > 0) {
        headers.append('Authorization', 'bearer ' + this._activeSession_id);
      }
      headers.append('Content-Type', 'application/vnd.api+json');
      let data = JSON.stringify(ans);
      return this.http.post(this._localHost + '/api/DemoExam/Save', data,
        new RequestOptions({ headers: headers }));
    }
    catch (error) {
      debugger;
      console.log(error)
    }
  }

}
