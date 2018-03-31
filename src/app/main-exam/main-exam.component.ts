import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { QuestionOutput, QuestionSet } from '../models/question-set';
import { Alert } from '../models/alert.interface';
import { NgbModalRef, NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ExamService } from '../http-service-registry/services/exam.service';
import { DataService } from '../http-service-registry/services/data.service';
import { Router } from '@angular/router';
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
  //public selectedQuestion: Observable<QuestionOutput>;
  //public selectedAnswer: RelExamAnswer;
  public questionAnswerMap: Map<string, QuestionSet>;
  public startPage: boolean = true;
  public sessionSubscription;
  public alerts: Array<Alert> = [];
  private _userId: string = '';
  private mmodal: NgbModalRef;


  form = this.fb.group({
    start: this.fb.group({ disclaimer: [false, [Validators.required]] }),
    questionAnswer: this.fb.array([])
  })
  constructor(
    private fb: FormBuilder,
    private service: ExamService,
    private dataService: DataService,
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService
  ) {
    loginService.userId.subscribe((id) => {
      this._userId = id;
    });
  }

  ngOnInit() {

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
    this.sessionSubscription = this.service.startSession(0).subscribe((quest: QuestionOutput[]) => {
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
      this.startPage = false;
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
}
