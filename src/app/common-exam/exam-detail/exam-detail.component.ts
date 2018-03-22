import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { QuestionSet, OptionSet, QuestionOutput, QuestionResult } from '../../models/question-set';
import { AnswerSet } from '../../models/answer-set';
import { RelExamAnswer } from '../../models/rel-exam-answer.interface';

import { DataService } from '../../http-service-registry/services/data.service';
import { ExamService } from '../../http-service-registry/services/exam.service';

@Component({
  selector: 'exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() map: Map<string, QuestionSet>;


  public checkedBool: boolean;
  public AnswersList: Array<RelExamAnswer> = [];
  private sessionId: string = "d91bc146-7252-7442-4f2b-94eb16f00899";
  constructor(private route: ActivatedRoute,
    private service: ExamService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    // this.getSelectedQuestion();
  }

  private answers: AnswerSet;

  /* getSelectedQuestion(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // const id = this.route.snapshot.paramMap.get['id'];
    let newQuest = this.dataService.currentQuestion.subscribe(ques => {
      debugger;
      if (ques !== null) {
        let ans: RelExamAnswer;
        this.AnswersList.forEach(element => {
          if (element.questionId == ques.questionId) {
            ans = element;
          }
        });
        // let ans = this.AnswersList.forEach(x => {if(x.QuestionId == ques.question_id) return x;});
        this.Question = ques;
        if (ans != null) {
          this.Question.selectedAnswer = ans;
          this.Question.questions.optionSet.forEach(element => {
            if (element.option_id == ans.selectedOptionId)
              element.option_checked = true;
            else
              element.option_checked = false;
          });
          // this.Question.questions.optionSet.
        }
      }
    });
    console.log('selected question : ' + newQuest);
    // if (this.Question !== null) {
    //   this.service.getSelectedQuestion(this.Question[0].question_id).subscribe(ques => this.Question = ques.questions[0]);
    // }
  } */



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
    this.map.get(questionId).question_text;
  }

  public optionsByQuestionId(questionId: string) {
    this.map.get(questionId).optionSet;
  }

}
