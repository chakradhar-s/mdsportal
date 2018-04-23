import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { QuestionSet, QuestionOutput, QuestionResult } from '../models/question-set';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { NgbModal, NgbActiveModal, NgbModalOptions, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ExamService } from '../http-service-registry/services/exam.service';
import { AnswerSet } from '../models/answer-set';
import { RelExamAnswer, StatusId } from '../models/rel-exam-answer.interface';
import { templateJitUrl } from '@angular/compiler';
import { Alert } from '../models/alert.interface';

import { LoginService } from '../http-service-registry/services/login-service.service';
import { UserLoginValidators } from '../login-user/login/login-user.validators';


@Component({
  selector: 'app-demo-exam',
  templateUrl: './demo-exam.component.html',
  styleUrls: ['./demo-exam.component.scss']
})
export class DemoExamComponent implements OnInit, OnDestroy {
  @Output() endExamEvent = new EventEmitter<boolean>();
  private questions: QuestionOutput[] = [];
  public questionAnswerMap: Map<string, QuestionSet>;
  public startPage: boolean = false;
  public loginPage: boolean = true;
  public sessionSubscription;
  public alerts: Array<Alert> = [];
  private _userId: string = '';
  private mmodal: NgbModalRef;
  private _activeQuestionPaper: string = '';
  public inValidCredentials: boolean = false;

  form = this.fb.group({
    start: this.fb.group({ disclaimer: [false, [Validators.required]] }),
    questionAnswer: this.fb.array([])
  });

  public loginForm = this.fb.group({
    userName: ['1111122222',
      [Validators.required,
      UserLoginValidators.validUserName]],
    password: ['1111',
      [Validators.required,
      UserLoginValidators.validPassword]]
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ExamService,
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService) {
    loginService.userId.subscribe((id) => {
      this._userId = id;
    });

  }

  ngOnInit() {
    console.log('demo exam log ' + this.questions);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this._activeQuestionPaper = params.get('paperid');
    });

  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  addQuestionAnswer(groupedQuestions: QuestionOutput): any {
    const control = this.form.get('questionAnswer') as FormArray;
    groupedQuestions.questionsResult.forEach(item => {
      control.push(this.createQuestionMap(item.selectedAnswer))
    });
  }

  createQuestionMap(answer: RelExamAnswer) {
    return this.fb.group({
      questionId: answer.questionId || '',
      selectedOptionId: answer.selectedOptionId || '',
      selectedOptionStatusId: answer.selectedOptionStatusId || ''
    });
  }

  startSession(starts: boolean) {
    this.sessionSubscription = this.service.startSession(0, this._activeQuestionPaper).subscribe((quest: QuestionOutput[]) => {
      const queriesFormat: QuestionOutput[] = quest;

      const ehjd = [];

      for (let i = 0; i < queriesFormat.length; i++) {
        let temp3 = queriesFormat[i].questionsResult.map<[string, QuestionSet]>(jr => {
          return [jr.questionId, jr.questions];
        });
        ehjd.push(new Map<string, QuestionSet>(temp3));
        this.addQuestionAnswer(queriesFormat[i]);
      }

      this.questionAnswerMap = new Map();
      ehjd.forEach(item => {
        item.forEach((bonf, ji) => {
          this.questionAnswerMap.set(ji, bonf);
        })
      });

      this.questions.concat(quest);

      this.alerts = [];
      this.startPage = false;
      if (!this.questionAnswerMap.size) {
        this.startPage = true;
        this.alerts = [{
          id: 1,
          type: 'warning',
          message: 'Soory, question paper is invalid, please report it to an adminstrator/support team for this test!',
        }];

        document.querySelector("body").scrollTo(0, 0);
        window.scrollTo(0, 0);
      }

    }, () => {
      this.startPage = true;
    }, () => {

    });
  }

  onSubmit(content) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.mmodal = this.modalService.open(content);
    this.mmodal.result.then((result) => {

    }, (reason) => {

    });
  }



  navigate() {
    this.mmodal.close();
    this.router.navigate(['/view-results', this._userId], { replaceUrl: true });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public loginSubmit() {
    if (this.loginForm.valid) {
      this.loginService.validateDemoUser({ userName: this.loginForm.get('userName').value, password: this.loginForm.get('password').value });
      this.loginService.demoUserId.subscribe(() => {
        this.loginPage = false;
        this.startPage = true;
      });

    }
  }

  get invalid() {
    this.inValidCredentials = false;
    return (
      this.loginForm.get('userName').hasError('invalidUserName') &&
      this.loginForm.get('userName').dirty &&
      !this.demoFormrequired('userName')
    );
  }

  get passvalid() {
    this.inValidCredentials = false;
    return (
      this.loginForm.get('password').hasError('invalidPassword') &&
      this.loginForm.get('password').dirty &&
      !this.demoFormrequired('password')
    );
  }

  demoFormrequired(name: string) {
    return (
      this.loginForm.get(`${name}`).hasError('required') &&
      this.loginForm.get(`${name}`).touched
    );
  }

}
