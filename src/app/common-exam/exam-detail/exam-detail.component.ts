import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../http-service-registry/services/exam.service';
import { QuestionSet, OptionSet } from '../../models/question-set';
import { DataService } from '../../http-service-registry/services/data.service';
import { AnswerSet } from '../../models/answer-set';

@Component({
  selector: 'exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  @Input() Question: QuestionSet
  constructor(private route: ActivatedRoute,
    private service: ExamService,
    private dataService: DataService) { }

  ngOnInit() {
    this.getSelectedQuestion();
  }

  private answers: AnswerSet;

  getSelectedQuestion(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // const id = this.route.snapshot.paramMap.get['id'];
    let newQuest = this.dataService.currentQuestion.subscribe(ques => this.Question = ques);
    console.log('selected question : ' + newQuest);
    if (this.Question !== null) {
      this.service.getSelectedQuestion(this.Question.question_index).subscribe(ques => this.Question = ques);
    }
  }

  setAnswer(option:OptionSet): void {
    let answerObj = new AnswerSet(option.question_id,option.option_id); 
    this.dataService.changeAnswer(answerObj);
  }

}
