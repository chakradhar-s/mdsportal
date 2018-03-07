import { Component, OnInit } from '@angular/core';
import { QuestionSet } from '../models/question-set';
import { ExamService } from '../services/exam.service';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-demo-exam',
  templateUrl: './demo-exam.component.html',
  styleUrls: ['./demo-exam.component.scss']
})
export class DemoExamComponent implements OnInit {
  public Questions: QuestionSet[];
  public SelectedQuestion: Observable<QuestionSet>;
  
  constructor(
    private service: ExamService,
    private dataService: DataService) {

  }
  getQuestion(): void {
    // this.Questions = this.service.getQuestions();
    this.service.getQuestions().subscribe(ques => this.Questions = ques);
    // this.dataService.currentQuestion.subscribe(cur => this.SelectedQuestion = cur);
  }
  ngOnInit() {
    this.getQuestion();
  }

  questionChanged(obj: QuestionSet): void {
    this.SelectedQuestion.subscribe()
  }

}
