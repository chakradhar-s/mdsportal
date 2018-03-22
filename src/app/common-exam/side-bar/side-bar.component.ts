import { Component, OnInit, Input } from '@angular/core';
import { QuestionSet, QuestionOutput, QuestionResult } from '../../models/question-set';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../http-service-registry/services/data.service';

@Component({
  selector: 'exam-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
 @Input() Questions : QuestionOutput[];
 SelectedQuestion : QuestionResult;

 
  constructor(private data : DataService) { }

  ngOnInit() {
    this.data.currentQuestion.subscribe(ques => this.SelectedQuestion = ques);
    debugger;
    console.log('side bar logged ' + this.Questions);
  }

  setSelected(question : QuestionResult ) : void {
    console.log('side bar selected ' + question);
    // this.SelectedQuestion = question;
    this.data.changeQuestion(question);
  }

}
