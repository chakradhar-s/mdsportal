import { Component, OnInit } from '@angular/core';
import { QuestionSet, QuestionOutput } from '../models/question-set';
import { ExamService } from '../http-service-registry/services/exam.service';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../http-service-registry/services/data.service';
import { AnswerSet } from '../models/answer-set';
import { RelExamAnswer, StatusId } from '../models/rel-exam-answer';

@Component({
  selector: 'app-demo-exam',
  templateUrl: './demo-exam.component.html',
  styleUrls: ['./demo-exam.component.scss']
})
export class DemoExamComponent implements OnInit {
  questions: QuestionOutput[];
  public selectedQuestion: Observable<QuestionOutput>;
  public selectedAnswer: RelExamAnswer;

  constructor(
    private service: ExamService,
    private dataService: DataService) {

  }
  getQuestion(): void {
    this.service.getQuestions()
    // .map(ques => {
    //   let d =  ques;
    //   return d;
    // }) 
    .subscribe(ques => {
      debugger;
      this.questions = ques;
      // console.log(this.questions);
      //this.dataService.changeQuestion(this.questions[0]);
    });
    console.log('demo exam logging ' + this.questions);
    // this.data.changeQuestion(question);
    // this.dataService.currentQuestion.subscribe(cur => this.SelectedQuestion = cur);
  }
  ngOnInit() {
    this.getQuestion();
    console.log('demo exam log ' + this.questions);

  }

  questionChanged(obj: QuestionOutput): void {
    this.selectedQuestion.subscribe();
  }

  test():void{
    
  }

  saveAndNext(): void {
    console.log('save triggered');
    this.dataService.currentAnswer.subscribe(next => this.selectedAnswer = next);
    this.service.insertOrUpdateAnswer(this.selectedAnswer, StatusId.Answered);
    this.service.updateQuestion(this.selectedAnswer.QuestionId,this.selectedAnswer);
  }

  saveAndMark(): void {
    this.dataService.currentAnswer.subscribe(next => this.selectedAnswer = next);
    this.service.insertOrUpdateAnswer(this.selectedAnswer, StatusId.Marked_For_Review);
  }

}
