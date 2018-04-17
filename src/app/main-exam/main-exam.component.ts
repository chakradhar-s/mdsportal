import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuestionOutput, QuestionSet } from '../models/question-set';
import { Alert } from '../models/alert.interface';
import { NgbModalRef, NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ExamService } from '../http-service-registry/services/exam.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../http-service-registry/services/login-service.service';
import { RelExamAnswer } from '../models/rel-exam-answer.interface';


@Component({
  selector: 'app-main-exam',
  templateUrl: './main-exam.component.html',
  styleUrls: ['./main-exam.component.scss']
})
export class MainExamComponent implements OnInit {
  @Output() endExamEvent = new EventEmitter<boolean>();
  private questions: QuestionOutput[] = [];
  public questionAnswerMap: Map<string, QuestionSet>;
  public startPage: boolean = true;
  public sessionSubscription;
  public alerts: Array<Alert> = [];
  private _userId: string = '';
  private mmodal: NgbModalRef;
  private _activeQuestionPaper: string = '';
  public timerCount : number = 120;


  form = this.fb.group({
    start: this.fb.group({ disclaimer: [false, [Validators.required]] }),
    questionAnswer: this.fb.array([])
  })
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ExamService,
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService
  ) {
    loginService.userId.subscribe((id) => {
      this._userId = id;
    });
  }

  ngOnInit() {
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
    this.sessionSubscription = this.service.startSession(1, this._activeQuestionPaper).subscribe((quest: QuestionOutput[]) => {
      const queriesFormat: QuestionOutput[] = quest;
      console.log(queriesFormat);
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

    }, (error) => {
      this.startPage = true;
      this.alerts = [{
        id: 1,
        type: 'danger',
        message: error.json().error,
      }];

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
      this.endExam();
    }, (reason) => {

    });
  }

  navigate() {
    this.mmodal.close();
    this.router.navigate(['view-results', this._userId], { replaceUrl: true });
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

  public endExam(){
    this.service.examCompleted().subscribe((response : Response) => {
      console.log('exam ended');
      console.log('api call made');
      console.log(response);
    }, (error : Error) => {
      console.log(error);
    })
  }
}
