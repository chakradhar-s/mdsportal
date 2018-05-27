import { Injectable } from '@angular/core';
import { QuestionSet, QuestionOutput, QuestionResult, ReportModel } from '../../models/question-set';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RelExamAnswer, StatusId } from '../../models/rel-exam-answer.interface';
import { LoginService } from './login-service.service';

@Injectable()
export class ExamService {

   private _proxyHost: string = "http://ec2-52-66-160-163.ap-south-1.compute.amazonaws.com/mdservice/api";
  //private _proxyHost: string = "http://localhost:5000/mdservice/api";

  
  private _activeSession_id: string = "";
  private _testObservable: Observable<QuestionOutput[]>;
  private _userId: string;

  constructor(private http: Http,
    private loginService: LoginService) {
    loginService.userId.subscribe((id) => {
      this._userId = id;
    });
  }

  startSession(examType: number, questionPaper_id: string) {
    const headers = new Headers();
    if (examType == 1 && window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    } else if (examType == 0 && window.localStorage.getItem('jwt-demo-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-demo-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.post(this._proxyHost + '/exam/startsession',
      JSON.stringify({ questionPaperId: questionPaper_id, "examType": examType }),
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
    return this.http.get(this._proxyHost + '/DemoExam/GetQuestionPaperCombo/',
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
      return this.http.post(this._proxyHost + '/DemoExam/Save', data,
        new RequestOptions({ headers: headers }));
    }
    catch (error) {
      console.log(error)
    }
  }

  insertQuestionReport(input: ReportModel) {
    try {
      const headers = new Headers();
      if (this._activeSession_id.length > 0) {
        headers.append('Authorization', 'bearer ' + this._activeSession_id);
      }
      headers.append('Content-Type', 'application/vnd.api+json');
      let url = this._proxyHost + '/DemoExam/Report';
      let data = JSON.stringify(input);
      this.http.post(url, data,
        new RequestOptions({ headers: headers }))
        .map((response: Response) => response.json())
        .catch((error) =>
          Observable.throw(error)
        )
        .subscribe();
    } catch (error) {
      console.log(error)
    }
  }


  public get activeSession(){
    return this._activeSession_id;
  }


  public  examCompleted() {

    const headers = new Headers();
    if (this._activeSession_id.length > 0) {
      headers.append('Authorization', 'bearer ' + this._activeSession_id);
      console.log('**END EXAM**');
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.post(this._proxyHost + '/DemoExam/Completed',
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  };


  public getAnalytics() {

    const headers = new Headers();
    if (window.localStorage.getItem('jwt-access-mds')) {
      let rslt = JSON.parse(window.localStorage.getItem('jwt-access-mds'));
      headers.append('Authorization', 'bearer ' + rslt.access_token);
    }
    headers.append('Content-Type', 'application/vnd.api+json');
    return this.http.get(this._proxyHost + '/Analysis/GetAnalysis/',
      new RequestOptions({ headers: headers }))
      .map((response: Response) => response.json())
      .catch((error) =>
        Observable.throw(error)
      );
  };

}
