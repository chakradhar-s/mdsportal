import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { QuestionSet, OptionSet, QuestionOutput, QuestionResult } from '../../models/question-set';
import { AnswerSet } from '../../models/answer-set';
import { RelExamAnswer, StatusId } from '../../models/rel-exam-answer.interface';

import { DataService } from '../../http-service-registry/services/data.service';
import { ExamService } from '../../http-service-registry/services/exam.service';

import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() map: Map<string, QuestionSet>;

  public answerStatus = StatusId;
  public currentCounter: number = 0;

  public checkedBool: boolean;
  public AnswersList: Array<RelExamAnswer> = [];
  private sessionId: string = "d91bc146-7252-7442-4f2b-94eb16f00899";
  constructor(private route: ActivatedRoute,
    private service: ExamService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    // this.getSelectedQuestion();
    this.answerStatus.Marked_For_Review;

    this.questionanswers.forEach((groups, index) => {
      groups.valueChanges.debounceTime(800).subscribe(r => {
        const sestatus: number = r.selectedOptionId.length > 0 ? this.answerStatus.Answered : r.selectedOptionStatusId;
        this.service.insertOrUpdateAnswer({
          questionId: r.questionId,
          selectedOptionId: r.selectedOptionId,
          selectedOptionStatusId: sestatus
        }).subscribe();
      });
    });
    //.valueChanges.debounceTime(800).subscribe(r => console.log(r));

  }

  private answers: AnswerSet;

  setAnswer(option: OptionSet): void {
    debugger;
    let answerObj: RelExamAnswer = { questionId: option.question_id, selectedOptionId: option.option_id, selectedOptionStatusId: 1 };
    this.dataService.changeAnswer(answerObj);
    var answeredIndex = this.AnswersList.findIndex(x => x.questionId == option.question_id);
    if (answeredIndex >= 0) {
      this.AnswersList.splice(answeredIndex, 1);
    }
    this.AnswersList.push(answerObj)
    // this.service.updateQuestion(option.question_id, answerObj);
    // this.Question.selectedAnswer = answerObj;
  }

  get questionanswers() {
    return (this.parent.get('questionAnswer') as FormArray).controls;
  }

  public questionByQuestionId(questionId: string) {
    return this.map.get(questionId);
  }

  public optionsByQuestionId(questionId: string) {
    return this.map.get(questionId).optionSet;
  }

  public clearResponse(item, i) {
    item.get("selectedOptionId").setValue('');
    //(this.parent.get('questionAnswer') as FormArray).get(`${i}.selectedOptionId`).setValue('');
  }

  public show(questionNum: number) {
    this.currentCounter = questionNum;
  }

  public statusofitem(item): string {
    const optionValue = item.get("selectedOptionId").value;
    const statusValue = item.get("selectedOptionStatusId").value;
    if (optionValue.length > 0) {
      if (statusValue == this.answerStatus.Marked_For_Review){
        "review_marked_considered";
      }else if(statusValue==this.answerStatus.Unseen){
        "answered";
      }
    }
    else if(statusValue == this.answerStatus.Marked_For_Review){
      "review";
    }
    return "";
  }

}
