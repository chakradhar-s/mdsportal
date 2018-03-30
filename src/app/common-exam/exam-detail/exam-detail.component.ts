import { Component, OnInit, Input, group } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { QuestionSet, OptionSet, QuestionOutput, QuestionResult } from '../../models/question-set';
import { AnswerSet } from '../../models/answer-set';
import { RelExamAnswer, StatusId } from '../../models/rel-exam-answer.interface';

import { ExamService } from '../../http-service-registry/services/exam.service';

import "rxjs/add/operator/debounceTime";
import { FormControl } from '@angular/forms/src/model';

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
  public buttonsStatus: Map<string, string> = new Map<string, string>();
  public someStatus: string[] = [];

  public checkedBool: boolean;

  constructor(private route: ActivatedRoute,
    private service: ExamService
  ) { }

  ngOnInit() {
    // this.getSelectedQuestion();
    this.answerStatus.Marked_For_Review;

    this.questionanswers.forEach((groups, index) => {
      this.buttonsStatus.set(groups.get('questionId').value, this.statusofitem(groups.value));
      groups.valueChanges.debounceTime(800).subscribe(r => {        
        const sestatus: number = r.selectedOptionId.length > 0 ? this.answerStatus.Answered : r.selectedOptionStatusId;
        const shallowValue = {
          questionId: r.questionId,
          selectedOptionId: r.selectedOptionId,
          selectedOptionStatusId: r.selectedOptionStatusId
        };
        this.buttonsStatus.set(r.questionId, this.statusofitem(shallowValue));
        this.answersStatus();
        this.service.insertOrUpdateAnswer(shallowValue).subscribe();
      });
    });
    this.answersStatus();

    //.valueChanges.debounceTime(800).subscribe(r => console.log(r));

  }  

  get questionanswers() {
    return (this.parent.get('questionAnswer') as FormArray).controls;
  }

  private answersStatus() {
    this.someStatus = [];
    this.buttonsStatus.forEach(element => {
      this.someStatus.push(element);
    });
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
    const optionValue = item.selectedOptionId;
    const statusValue = item.selectedOptionStatusId;
    if (optionValue.length > 0) {
      if (statusValue == this.answerStatus.Marked_For_Review) {
        return "review_marked_considered";
      } else {
        return "answered";
      }
    }
    else if (statusValue == this.answerStatus.Marked_For_Review) {
      return "review";
    }
    return "";
  }

  public get markedForReviewCount() {
    return this.someStatus.filter(t => t == "review").length;
  }

  public get answermarkedForReviewCount() {
    return this.someStatus.filter(t => t == "review_marked_considered").length;
  }

  public get answerCount() {
    return this.someStatus.filter(t => t == "answered").length;
  }

  public reviewTrigger(questionSe: FormGroup, changeEvent) {
    if (changeEvent.currentTarget.checked) {
      questionSe.get('selectedOptionStatusId').setValue(this.answerStatus.Marked_For_Review);
    }
    else{
      questionSe.get('selectedOptionStatusId').setValue(this.answerStatus.Visited);
    }
  }

}
