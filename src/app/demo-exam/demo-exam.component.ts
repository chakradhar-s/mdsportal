import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { QuestionSet, QuestionOutput, QuestionResult } from '../models/question-set';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NgbModal, NgbActiveModal, NgbModalOptions, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ExamService } from '../http-service-registry/services/exam.service';
import { DataService } from '../http-service-registry/services/data.service';
import { AnswerSet } from '../models/answer-set';
import { RelExamAnswer, StatusId } from '../models/rel-exam-answer.interface';
import { templateJitUrl } from '@angular/compiler';
import { Alert } from '../models/alert.interface';

import { LoginService } from '../http-service-registry/services/login-service.service';


@Component({
  selector: 'app-demo-exam',
  templateUrl: './demo-exam.component.html',
  styleUrls: ['./demo-exam.component.scss']
})
export class DemoExamComponent implements OnInit, OnDestroy {
  @Output() endExamEvent = new EventEmitter<boolean>();
  private questions: QuestionOutput[] = [];
  //public selectedQuestion: Observable<QuestionOutput>;
  //public selectedAnswer: RelExamAnswer;
  public questionAnswerMap: Map<string, QuestionSet>;
  public startPage: boolean = true;
  public sessionSubscription;
  public alerts: Array<Alert> = [];
  private _userId: string = '';
  private mmodal:NgbModalRef;
  

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
    private loginService: LoginService) {
    loginService.userId.subscribe((id) => {
      this._userId = id;
    });
  }

  // getQuestion(): void {
  //   this.service.getQuestions()
  //     // .map(ques => {
  //     //   let d =  ques;
  //     //   return d;
  //     // }) 
  //     .subscribe(ques => {
  //       debugger;
  //       this.questions = ques;
  //       const ehjd = [];
  //       this.questions.forEach(item => {
  //         ehjd.push(item.questionResult.map<[string, QuestionSet]>(jr => {
  //           return [jr.questionId, jr.questions];
  //         }));
  //         this.addQuestionAnswer(item);
  //       });
  //       this.questionAnswerMap = new Map<string, QuestionSet>(ehjd);
  //       // console.log(this.questions);
  //       //this.dataService.changeQuestion(this.questions[0]);
  //     });
  //   console.log('demo exam logging ' + this.questions);
  //   // this.data.changeQuestion(question);
  //   // this.dataService.currentQuestion.subscribe(cur => this.SelectedQuestion = cur);
  // }

  ngOnInit() {
    console.log('demo exam log ' + this.questions);

  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  /* questionChanged(obj: QuestionOutput): void {
    this.selectedQuestion.subscribe();
  } */

  test($event): void {
console.log('test event triggered;');
console.log($event);
  }

  /* saveAndNext(): void {
    console.log('save triggered');
    this.dataService.currentAnswer.subscribe(next => this.selectedAnswer = next);
    this.service.insertOrUpdateAnswer(this.selectedAnswer, StatusId.Answered);
    this.service.updateQuestion(this.selectedAnswer.questionId, this.selectedAnswer);
  }

  saveAndMark(): void {
    this.dataService.currentAnswer.subscribe(next => this.selectedAnswer = next);
    this.service.insertOrUpdateAnswer(this.selectedAnswer, StatusId.Marked_For_Review);
  } */

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
      // this.questions.forEach(item => {
      //   ehjd.push(item.questionResult.map<[string, QuestionSet]>(jr => {
      //     return [jr.questionId, jr.questions];
      //   }));
      //   this.addQuestionAnswer(item);
      // });
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
