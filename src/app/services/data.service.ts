import { Injectable } from '@angular/core';
import { QuestionSet } from '../models/question-set';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private selectedQuestion = new BehaviorSubject<QuestionSet>(null);
  currentQuestion = this.selectedQuestion.asObservable();
  constructor() {
    // this.selectedQuestion.subscribe(x => x.question_index = 1)
   }

  changeQuestion(ques : QuestionSet){
    this.selectedQuestion.next(ques);
  }

}
