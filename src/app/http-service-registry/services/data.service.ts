import { Injectable } from '@angular/core';
import { QuestionSet } from '../../models/question-set';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { AnswerSet } from '../../models/answer-set';
import { RelExamAnswer } from '../../models/rel-exam-answer';

@Injectable()
export class DataService {

  private selectedQuestion = new BehaviorSubject<QuestionSet>(null);
  private selectedAnswer = new BehaviorSubject<RelExamAnswer>(null);
  currentQuestion = this.selectedQuestion.asObservable();
  currentAnswer = this.selectedAnswer.asObservable();
  constructor() {
    // this.selectedQuestion.subscribe(x => x.question_index = 1)
   }

  changeQuestion(ques : QuestionSet){
    this.selectedQuestion.next(ques);
  }

  changeAnswer(ans : RelExamAnswer){
    debugger;
    console.log('changed answer to so and so' + ans.QuestionId + '|' + ans.SelectedOptionId);
    this.selectedAnswer.next(ans);
  }
  

}
