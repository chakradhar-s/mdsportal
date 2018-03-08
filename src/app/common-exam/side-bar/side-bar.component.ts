import { Component, OnInit, Input } from '@angular/core';
import { QuestionSet } from '../../models/question-set';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'exam-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
 @Input() Questions : Observable<QuestionSet[]>;
 SelectedQuestion : QuestionSet;

  constructor(private data : DataService) { }

  ngOnInit() {
    this.data.currentQuestion.subscribe(ques => this.SelectedQuestion = ques);
  }

  setSelected(question : QuestionSet ) : void {
    console.log(question);
    // this.SelectedQuestion = question;
    this.data.changeQuestion(question);
  }

}
